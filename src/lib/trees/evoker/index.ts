import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";
import { GENERAL_TREE_LIMIT, SPEC_TREE_LIMIT } from "../constants";
import { ParsedClassTalents } from "../types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Evoker
 */
import devastationGeneral from "@/data/evoker/devastation/general.json";
import devastationTree from "@/data/evoker/devastation/tree.json";

import preservationGeneral from "@/data/evoker/preservation/general.json";
import preservationTree from "@/data/evoker/preservation/tree.json";

export const Evoker: ParsedClassTalents = {
  DEVASTATION: {
    SLUG: "evoker/devastation",
    GENERAL: { TALENTS: parser.parse(devastationGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(devastationTree), LIMIT: SPEC_TREE_LIMIT },
  },
  PRESERVATION: {
    SLUG: "evoker/preservation",
    GENERAL: { TALENTS: parser.parse(preservationGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(preservationTree), LIMIT: SPEC_TREE_LIMIT },
  },
};
