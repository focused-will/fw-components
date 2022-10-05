import { TalentNodeData } from "@/components/TalentTree/types";

export interface ParsedSpecTalents {
  TALENTS: TalentNodeData[];
  LIMIT: number;
}

export interface ITalentSet {
  // Used for WoWHead serialization
  SLUG: string;
  // The general tree for this spec
  GENERAL: ParsedSpecTalents;
  // The spec tree for this spec
  TREE: ParsedSpecTalents;
}

export interface ParsedClassTalents {
  [key: string]: ITalentSet;
}
