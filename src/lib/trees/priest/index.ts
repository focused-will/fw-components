import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";
import { GENERAL_TREE_LIMIT, SPEC_TREE_LIMIT } from "../constants";
import { ParsedClassTalents } from "../types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Priest
 */
import discGeneral from "@/data/priest/discipline/general.json";
import discTree from "@/data/priest/discipline/tree.json";

import holyGeneral from "@/data/priest/holy/general.json";
import holyTree from "@/data/priest/holy/tree.json";

import shadowGeneral from "@/data/priest/shadow/general.json";
import shadowTree from "@/data/priest/shadow/tree.json";

export const Priest: ParsedClassTalents = {
  DISCIPLINE: {
    GENERAL: { TALENTS: parser.parse(discGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(discTree), LIMIT: SPEC_TREE_LIMIT },
  },
  HOLY: {
    GENERAL: { TALENTS: parser.parse(holyGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(holyTree), LIMIT: SPEC_TREE_LIMIT },
  },
  SHADOW: {
    GENERAL: { TALENTS: parser.parse(shadowGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(shadowTree), LIMIT: SPEC_TREE_LIMIT },
  },
};
