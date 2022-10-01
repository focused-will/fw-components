import { z } from "zod";
import { TalentNodeDataSchema } from "components/TalentTree/types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Druid
 */
import restoDGeneral from "data/druid/restoration/general.json";
import restoDTree from "data/druid/restoration/tree.json";

export const Druid = {
  restoration: {
    general: parser.parse(restoDGeneral),
    tree: parser.parse(restoDTree),
  },
};
