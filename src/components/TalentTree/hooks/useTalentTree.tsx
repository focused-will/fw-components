import { TalentNodeWithMetadata } from "@/lib/serialization/wowhead";
import { ParsedSpecTalents } from "@/lib/trees/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { PointCount, TalentNodeData } from "../types";

export interface ITalentNode {
  data: TalentNodeData;
  parentNodes: number[];
  investment: number;
  selectedId?: number;
}

interface SelectedTalent {
  talentId: number;
  points: number;
}

export type SelectedTalents = Map<number, SelectedTalent>;

interface PointAllocation {
  lower: number;
  middle: number;
  upper: number;
}

/**
 * Maps row numbers to the minimum points required to invest
 */
function pointThresholdMet(row: number, currentPointAllocation: PointAllocation) {
  if (row >= 8 && currentPointAllocation.lower + currentPointAllocation.middle < 20) {
    return false;
  }

  if (row >= 5 && currentPointAllocation.lower < 8) {
    return false;
  }

  return true;
}

function allocatePoints(
  row: number,
  prevPoints: PointAllocation,
  op: "+" | "-" = "+",
  amount = 1
): PointAllocation {
  const opMap: { [key in "+" | "-"]: (a: number, b: number) => number } = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  };

  return {
    lower: row < 5 ? opMap[op](prevPoints.lower, amount) : prevPoints.lower,
    middle: row >= 5 && row < 8 ? opMap[op](prevPoints.middle, amount) : prevPoints.middle,
    upper: row >= 8 ? opMap[op](prevPoints.upper, amount) : prevPoints.upper,
  };
}

/**
 * Map TalentNodeWithMetadata into a talentNode
 */
function toTalentNodeFromMetadata(metadataTalents: TalentNodeWithMetadata[]) {
  return metadataTalents.map((metadataTalent) => {
    return toTalentNode(metadataTalent.talentNodeData, {
      investment: metadataTalent.points,
      selectedId: metadataTalent.selectedId,
    });
  });
}

/**
 * Map talentNodeData into a talentNode
 */
function toTalentNode(talent: TalentNodeData, overrides = {}): ITalentNode {
  const isInitialSelection = talent.capacity === 0;
  const hasId = "id" in talent;

  return {
    data: talent,
    parentNodes: talent.links || [],
    investment: 0,
    selectedId: isInitialSelection && hasId ? talent.id : undefined,
    ...overrides,
  };
}

export function useTalentTree(
  parsedSpecTalents: ParsedSpecTalents,
  onChange?: (selectedTalents: SelectedTalents, pointCount: PointCount) => any,
  initialSelectedTalents?: TalentNodeWithMetadata[]
) {
  const { LIMIT, TALENTS } = parsedSpecTalents;
  const loaded = useRef(false);
  const [pointCount, setPointCount] = useState<PointAllocation>({ lower: 0, middle: 0, upper: 0 });
  const [talents, setTalents] = useState<Record<string, ITalentNode>>({});

  /**
   * Build initial tree
   */
  useEffect(() => {
    setPointCount({
      lower: 0,
      middle: 0,
      upper: 0,
    });
    loaded.current = false;

    const talents = TALENTS.reduce((acc, talent) => {
      acc[talent.cell] = toTalentNode(talent);
      return acc;
    }, {} as Record<string, ITalentNode>);

    setTalents(talents);
  }, [parsedSpecTalents]);

  /**
   * Load initialSelectedTalents
   */
  useEffect(() => {
    if (initialSelectedTalents) {
      const talentNodes = toTalentNodeFromMetadata(initialSelectedTalents);

      const importedTalents = talentNodes.reduce<{ [key: string]: ITalentNode }>(
        (acc, talentNode) => {
          const id = talentNode.data.cell;
          if (id === undefined) return acc;

          acc[id] = talentNode;
          return acc;
        },
        {}
      );

      const importedWithParentNodes = Object.entries(importedTalents).reduce<
        Record<string, ITalentNode>
      >((acc, [id, talentNode]) => {
        const existingParentNodes = talents[talentNode.data.cell]?.parentNodes || [];

        acc[id] = {
          ...talentNode,
          parentNodes: existingParentNodes,
        };

        return acc;
      }, {});

      const investedPoints = Object.values(importedWithParentNodes).reduce<PointAllocation>(
        (acc, curr) => allocatePoints(curr.data.row, acc, "+", curr.investment),
        {
          lower: 0,
          middle: 0,
          upper: 0,
        }
      );

      setPointCount(investedPoints);
      setTalents({
        ...talents,
        ...importedWithParentNodes,
      });
    }
  }, [initialSelectedTalents]);

  /**
   * Validate tree
   */
  useEffect(() => {
    if (!loaded.current) return;

    const badTalents: number[] = [];
    for (const talentCell in talents) {
      const talent = talents[talentCell];

      if (talent.investment === 0) continue;

      // Check if the cell has an invested parent
      const hasInvestedParent =
        talent.parentNodes.length === 0 ||
        talent.parentNodes.some(
          (parentId) => talents[parentId].investment === talents[parentId].data.capacity
        );
      const isPointThresholdMet = pointThresholdMet(talent.data.row, pointCount);
      const hasBadParent = talent.parentNodes.some((parentId) => badTalents.includes(parentId));

      if (!hasInvestedParent || !isPointThresholdMet || hasBadParent) {
        badTalents.push(talent.data.cell);
      }
    }

    // Remove all bad talents
    if (badTalents.length > 0) {
      setTalents((talents) => {
        const newTalents = { ...talents };
        badTalents.forEach((cell) => {
          newTalents[cell].investment = 0;
          newTalents[cell].selectedId = undefined;
        });

        return newTalents;
      });

      setPointCount((pointCount) => {
        const newPointAllocation = badTalents.reduce<PointAllocation>(
          (acc, curr) => {
            return allocatePoints(talents[curr].data.row, acc, "-", talents[curr].investment);
          },
          { ...pointCount }
        );

        return newPointAllocation;
      });
    }
  }, [pointCount]);

  /**
   * Invoke onChange when needed
   */
  useEffect(() => {
    if (!onChange || !loaded.current) {
      return;
    }

    const selectedTalents = Object.values(talents)
      .filter((talent) => talent.investment === talent.data.capacity || talent.investment > 0)
      .reduce((acc, talent) => {
        const id = ("id" in talent.data && talent.data.id) || talent.selectedId;

        if (!id) {
          throw new Error("TalentNode has no id");
        }

        acc.set(id, {
          talentId: id,
          points: talent.investment,
        });
        return acc;
      }, new Map<number, SelectedTalent>());

    onChange(selectedTalents, {
      current: pointCount.lower + pointCount.middle + pointCount.upper,
      limit: LIMIT,
    });
  }, [onChange, talents, pointCount]);

  useEffect(() => {
    loaded.current = true;
  }, []);

  /**
   * Increment investment into a talent node
   */
  const invest = useCallback(
    (talent: TalentNodeData, spellId?: number) => {
      const talentNode = talents[talent.cell];

      // Point limit reached
      if (pointCount.lower + pointCount.middle + pointCount.upper === LIMIT) {
        return;
      }

      // Talent is at capacity
      if (talentNode.investment === talentNode.data.capacity) {
        return;
      }

      // Talent threshold has not been met
      if (!pointThresholdMet(talentNode.data.row, pointCount)) {
        return;
      }

      // Talent parents are not invested
      const investedParent = talentNode.parentNodes.find(
        (parentId) => talents[parentId].investment === talents[parentId].data.capacity
      );

      if (talentNode.parentNodes.length > 0 && !investedParent) {
        return;
      }

      // Invest in talent
      const newTalentNode = {
        ...talentNode,
        investment: talentNode.investment + 1,
        selectedId: spellId,
      };

      setPointCount((pointCount) => allocatePoints(talentNode.data.row, pointCount, "+"));
      setTalents({
        ...talents,
        [talent.cell]: newTalentNode,
      });
    },
    [talents]
  );

  /**
   * Decrement investment into a talent node
   */
  const uninvest = useCallback(
    (talent: TalentNodeData) => {
      const talentNode = talents[talent.cell];

      if (talentNode.investment === 0) {
        return;
      }

      const newTalentNode = {
        ...talentNode,
        investment: talentNode.investment - 1,
        selectedId: talentNode.investment - 1 === 0 ? undefined : talentNode.selectedId,
      };

      setPointCount((pointCount) => allocatePoints(talentNode.data.row, pointCount, "-"));
      setTalents({
        ...talents,
        [talent.cell]: newTalentNode,
      });
    },
    [talents]
  );

  return {
    talents: Object.values(talents),
    invest,
    uninvest,
    pointCount,
  };
}
