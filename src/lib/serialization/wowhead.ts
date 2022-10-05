import { SelectedTalents } from "@/components/TalentTree/hooks/useTalentTree";
import { ParsedSpecTalents } from "../trees/types";
import { TalentNodeData } from "../../components/TalentTree/types";

/**
 * Data structure containing a TalentNode and metadata
 */
export interface TalentNodeWithMetadata {
  talentNodeData: TalentNodeData;
  // Only set for selection nodes
  selectedId?: number;
  points: number;
}

const VALID_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

/**
 * TODO: Implement
 */
export function serialize(
  slug: string,
  specTalents: ParsedSpecTalents,
  classTalents: ParsedSpecTalents,
  selectedTalents: SelectedTalents
) {}

export interface DeserializedTalents {
  GENERAL: TalentNodeWithMetadata[];
  TREE: TalentNodeWithMetadata[];
}

export function deserialize(
  str: string,
  classTalents: ParsedSpecTalents,
  specTalents: ParsedSpecTalents
): DeserializedTalents {
  /**
   * Start of hacky bs code for WoWhead deserialization
   */

  const [, , ...actualString] = str;
  const bits = [...actualString].map((char) => VALID_CHARS.indexOf(char));

  const TREES: { points: number[]; choices: number[] }[] = [
    {
      points: [],
      choices: [],
    },
    {
      points: [],
      choices: [],
    },
  ];

  let a = 0;
  while (bits.length && a < 2) {
    (["points", "choices"] as const).forEach((t: "points" | "choices") => {
      let n = bits.shift();
      let l = bits.splice(0, n);

      l.forEach((e) => TREES[a][t].push(e >> 4, (e >> 2) & 3, e & 3));
    });

    a++;
  }

  /**
   * End of hacky bs code for WoWhead deserialization
   */

  const classTalentArr = Object.values(classTalents.TALENTS);
  const specTalentArr = Object.values(specTalents.TALENTS);

  const reduceToSelections =
    (selections: { points: number[]; choices: number[] }, tree: TalentNodeData[]) =>
    (acc: TalentNodeWithMetadata[], curr: number, idx: number) => {
      if (curr > 0) {
        const talent = tree[idx];

        // Single choice talent
        if ("id" in talent) {
          acc.push({
            talentNodeData: talent,
            points: curr,
          });
        }

        // Multi choice talent
        if ("left" in talent) {
          const choice = selections.choices.shift();
          const talentId = choice === 0 ? talent.left.id : talent.right.id;

          acc.push({
            talentNodeData: talent,
            selectedId: talentId,
            points: curr,
          });
        }
      }

      return acc;
    };

  /**
   * Determine which talents are selected for each tree
   */
  const selectedClassTalents = TREES[0].points.reduce<TalentNodeWithMetadata[]>(
    reduceToSelections(TREES[0], classTalentArr),
    []
  );

  const selectedSpecTalents = TREES[1].points.reduce<TalentNodeWithMetadata[]>(
    reduceToSelections(TREES[1], specTalentArr),
    []
  );

  return {
    GENERAL: selectedClassTalents,
    TREE: selectedSpecTalents,
  };
}
