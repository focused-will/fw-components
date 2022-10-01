import { z } from "zod";
import { TalentNodeDataSchema } from "components/TalentTree/types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Priest
 */
import discGeneral from "data/priest/discipline/general.json";
import discTree from "data/priest/discipline/tree.json";

import holyGeneral from "data/priest/holy/general.json";
import holyTree from "data/priest/holy/tree.json";

import shadowGeneral from "data/priest/shadow/general.json";
import shadowTree from "data/priest/shadow/tree.json";

export const Priest = {
  discipline: {
    general: parser.parse(discGeneral),
    tree: parser.parse(discTree),
  },
  holy: {
    general: parser.parse(holyGeneral),
    tree: parser.parse(holyTree),
  },
  shadow: {
    general: parser.parse(shadowGeneral),
    tree: parser.parse(shadowTree),
  },
};
