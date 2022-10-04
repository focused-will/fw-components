import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";
import { GENERAL_TREE_LIMIT, SPEC_TREE_LIMIT } from "../constants";
import { ParsedClassTalents } from "../types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Paladin
 */
import protectionGeneral from "@/data/paladin/protection/general.json";
import protectionTree from "@/data/paladin/protection/tree.json";

import holyGeneral from "@/data/paladin/holy/general.json";
import holyTree from "@/data/paladin/holy/tree.json";

import retributionGeneral from "@/data/paladin/retribution/general.json";
import retributionTree from "@/data/paladin/retribution/tree.json";

export const Paladin: ParsedClassTalents = {
  PROTECTION: {
    GENERAL: { TALENTS: parser.parse(protectionGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(protectionTree), LIMIT: SPEC_TREE_LIMIT },
  },
  HOLY: {
    GENERAL: { TALENTS: parser.parse(holyGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(holyTree), LIMIT: SPEC_TREE_LIMIT },
  },
  RETRIBUTION: {
    GENERAL: { TALENTS: parser.parse(retributionGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(retributionTree), LIMIT: SPEC_TREE_LIMIT },
  },
};
