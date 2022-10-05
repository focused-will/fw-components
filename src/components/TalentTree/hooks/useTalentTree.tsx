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

/**
 * Maps row numbers to the minimum points required to invest
 */
function pointThresholdMet(row: number, currentPoints: number) {
  if (row >= 8 && currentPoints < 20) {
    return false;
  }

  if (row >= 5 && currentPoints < 8) {
    return false;
  }

  return true;
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
    parentNodes: [],
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
  const [pointCount, setPointCount] = useState(0);
  const [talents, setTalents] = useState<Record<string, ITalentNode>>({});

  /**
   * Load initialSelectedTalents
   */
  useEffect(() => {
    if (initialSelectedTalents) {
      const talentNodes = toTalentNodeFromMetadata(initialSelectedTalents);

      const talents = talentNodes.reduce<{ [key: string]: ITalentNode }>((acc, talentNode) => {
        const id = "id" in talentNode.data ? talentNode.data.id : talentNode.selectedId;
        if (id === undefined) return acc;

        acc[id] = talentNode;
        return acc;
      }, {});

      setTalents(talents);
    }
  }, [initialSelectedTalents]);

  /**
   * Build initial tree
   */
  useEffect(() => {
    setPointCount(0);
    loaded.current = false;

    const talents = TALENTS.reduce((acc, talent) => {
      acc[talent.cell] = toTalentNode(talent);
      return acc;
    }, {} as Record<string, ITalentNode>);

    // build parent nodes
    Object.values(talents).forEach((talent) => {
      if (talent.data.links) {
        talent.data.links.forEach((link) => {
          talents[link].parentNodes.push(talent.data.cell);
        });
      }
    });

    setTalents(talents);
  }, [parsedSpecTalents]);

  /**
   * Invoke onChange when needed
   */
  useEffect(() => {
    if (!onChange || !loaded.current) {
      return;
    }

    const selectedTalents = Object.values(talents)
      .filter((talent) => talent.investment === talent.data.capacity || talent.investment > 0)
      .reduce(
        (acc, talent) =>
          acc.set(talent.selectedId!, {
            talentId: talent.selectedId!,
            points: talent.investment,
          }),
        new Map<number, SelectedTalent>()
      );

    onChange(selectedTalents, {
      current: pointCount,
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
      if (pointCount === LIMIT) {
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

      setPointCount(pointCount + 1);
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

      setPointCount(pointCount - 1);
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
