import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";

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

export const Priest = {
  DISCIPLINE: {
    GENERAL: parser.parse(discGeneral),
    TREE: parser.parse(discTree),
  },
  HOLY: {
    GENERAL: parser.parse(holyGeneral),
    TREE: parser.parse(holyTree),
  },
  SHADOW: {
    GENERAL: parser.parse(shadowGeneral),
    TREE: parser.parse(shadowTree),
  },
};
