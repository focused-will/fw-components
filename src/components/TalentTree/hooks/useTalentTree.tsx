import { useCallback, useEffect, useMemo, useState } from "react";
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
  return {
    data: talent,
    parentNodes: [],
    investment: 0,
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
    (talent: TalentNodeData) => {
      const talentNode = talents[talent.cell];

      if (talentNode.investment === talentNode.data.capacity) {
        return;
      }

      const newTalentNode = {
        ...talentNode,
        investment: talentNode.investment + 1,
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
    (talent: TalentNodeData) => {
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
