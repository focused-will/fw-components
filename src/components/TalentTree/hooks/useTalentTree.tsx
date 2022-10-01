import { useCallback, useEffect, useState } from "react";
import { TalentNodeData } from "../types";

export interface ITalentNode {
  data: TalentNodeData;
  parentNodes: ITalentNode[];
  investment: number;
  selectedId?: number;
}

/**
 * Map talentNodeData into a talentNode
 */
function toTalentNode(talent: TalentNodeData): ITalentNode {
  const isInitialSelection = talent.capacity === 0;
  const hasId = "id" in talent;

  return {
    data: talent,
    parentNodes: [],
    investment: 0,
    selectedId: isInitialSelection && hasId ? talent.id : undefined,
  };
}

export function useTalentTree(talentNodes: TalentNodeData[]) {
  const [talents, setTalents] = useState<Record<string, ITalentNode>>({});

  /**
   * Build initial tree
   */
  useEffect(() => {
    setTalents(
      talentNodes.reduce((acc, talent) => {
        acc[talent.cell] = toTalentNode(talent);
        return acc;
      }, {} as Record<string, ITalentNode>)
    );
  }, [talentNodes]);

  /**
   * Increment investment into a talent node
   */
  const invest = useCallback(
    (talent: TalentNodeData, spellId?: number) => {
      debugger;
      const talentNode = talents[talent.cell];

      if (talentNode.investment === talentNode.data.capacity) {
        return;
      }

      const newTalentNode = {
        ...talentNode,
        investment: talentNode.investment + 1,
        selectedId: spellId,
      };

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
    (talent: TalentNodeData, spellId?: number) => {
      const talentNode = talents[talent.cell];

      if (talentNode.investment === 0) {
        return;
      }

      const newTalentNode = {
        ...talentNode,
        investment: talentNode.investment - 1,
      };

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
  };
}
