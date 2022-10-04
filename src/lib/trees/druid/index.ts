import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";
import { GENERAL_TREE_LIMIT, SPEC_TREE_LIMIT } from "../constants";
import { ParsedClassTalents } from "../types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Druid
 */
import restoDGeneral from "@/data/druid/restoration/general.json";
import restoDTree from "@/data/druid/restoration/tree.json";

import balanceDGeneral from "@/data/druid/balance/general.json";
import balanceDTree from "@/data/druid/balance/tree.json";

export const Druid: ParsedClassTalents = {
  RESTORATION: {
    GENERAL: { TALENTS: parser.parse(restoDGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(restoDTree), LIMIT: SPEC_TREE_LIMIT },
  },
  BALANCE: {
    GENERAL: { TALENTS: parser.parse(balanceDGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(balanceDTree), LIMIT: SPEC_TREE_LIMIT },
  },
};
