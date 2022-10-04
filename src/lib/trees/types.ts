import { TalentNodeData } from "@/components/TalentTree/types";

export interface ParsedSpecTalents {
  TALENTS: TalentNodeData[];
  LIMIT: number;
}

export interface ParsedClassTalents {
  [key: string]: {
    GENERAL: ParsedSpecTalents;
    TREE: ParsedSpecTalents;
  };
}
