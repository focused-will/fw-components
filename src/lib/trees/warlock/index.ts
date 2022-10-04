import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";
import { GENERAL_TREE_LIMIT, SPEC_TREE_LIMIT } from "../constants";
import { ParsedClassTalents } from "../types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Warlock
 */
import afflictionGeneral from "@/data/warlock/affliction/general.json";
import afflictionTree from "@/data/warlock/affliction/tree.json";

import demonologyGeneral from "@/data/warlock/demonology/general.json";
import demonologyTree from "@/data/warlock/demonology/tree.json";

import destructionGeneral from "@/data/warlock/destruction/general.json";
import destructionTree from "@/data/warlock/destruction/tree.json";

export const Warlock: ParsedClassTalents = {
  AFFLICTION: {
    GENERAL: { TALENTS: parser.parse(afflictionGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(afflictionTree), LIMIT: SPEC_TREE_LIMIT },
  },
  DEMONOLOGY: {
    GENERAL: { TALENTS: parser.parse(demonologyGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(demonologyTree), LIMIT: SPEC_TREE_LIMIT },
  },
  DESTRUCTION: {
    GENERAL: { TALENTS: parser.parse(destructionGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(destructionTree), LIMIT: SPEC_TREE_LIMIT },
  },
};
