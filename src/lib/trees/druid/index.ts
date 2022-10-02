import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Druid
 */
import restoDGeneral from "@/data/druid/restoration/general.json";
import restoDTree from "@/data/druid/restoration/tree.json";

import balanceDGeneral from "@/data/druid/balance/general.json";
import balanceDTree from "@/data/druid/balance/tree.json";

export const Druid = {
  RESTORATION: {
    GENERAL: parser.parse(restoDGeneral),
    TREE: parser.parse(restoDTree),
  },
  BALANCE: {
    GENERAL: parser.parse(balanceDGeneral),
    TREE: parser.parse(balanceDTree),
  },
};
