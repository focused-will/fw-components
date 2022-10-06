import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";
import { GENERAL_TREE_LIMIT, SPEC_TREE_LIMIT } from "../constants";
import { ParsedClassTalents } from "../types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Rogue
 */
import assassinationGeneral from "@/data/rogue/assassination/general.json";
import assassinationTree from "@/data/rogue/assassination/tree.json";

import outlawGeneral from "@/data/rogue/outlaw/general.json";
import outlawTree from "@/data/rogue/outlaw/tree.json";

import subtletyGeneral from "@/data/rogue/subtlety/general.json";
import subtletyTree from "@/data/rogue/subtlety/tree.json";

export const Rogue: ParsedClassTalents = {
  ASSASSINATION: {
    SLUG: "rogue/assassination",
    GENERAL: { TALENTS: parser.parse(assassinationGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(assassinationTree), LIMIT: SPEC_TREE_LIMIT },
  },
  OUTLAW: {
    SLUG: "rogue/outlaw",
    GENERAL: { TALENTS: parser.parse(outlawGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(outlawTree), LIMIT: SPEC_TREE_LIMIT },
  },
  SUBTLETY: {
    SLUG: "rogue/subtlety",
    GENERAL: { TALENTS: parser.parse(subtletyGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(subtletyTree), LIMIT: SPEC_TREE_LIMIT },
  },
};
