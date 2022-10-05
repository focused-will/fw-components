import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";
import { GENERAL_TREE_LIMIT, SPEC_TREE_LIMIT } from "../constants";
import { ParsedClassTalents } from "../types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Demon Hunter
 */
import vengeanceGeneral from "@/data/demon-hunter/vengeance/general.json";
import vengeanceTree from "@/data/demon-hunter/vengeance/tree.json";

import havocGeneral from "@/data/demon-hunter/havoc/general.json";
import havocTree from "@/data/demon-hunter/havoc/tree.json";

export const DemonHunter: ParsedClassTalents = {
  VENGEANCE: {
    SLUG: "demon-hunter/vengeance",
    GENERAL: { TALENTS: parser.parse(vengeanceGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(vengeanceTree), LIMIT: SPEC_TREE_LIMIT },
  },
  HAVOC: {
    SLUG: "demon-hunter/havoc",
    GENERAL: { TALENTS: parser.parse(havocGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(havocTree), LIMIT: SPEC_TREE_LIMIT },
  },
};
