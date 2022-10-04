import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";
import { GENERAL_TREE_LIMIT, SPEC_TREE_LIMIT } from "../constants";
import { ParsedClassTalents } from "../types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Hunter
 */
import beastMasteryGeneral from "@/data/hunter/beast/general.json";
import beastMasteryTree from "@/data/hunter/beast/tree.json";

import marksmanshipGeneral from "@/data/hunter/marksmanship/general.json";
import marksmanshipTree from "@/data/hunter/marksmanship/tree.json";

import survivalGeneral from "@/data/hunter/survival/general.json";
import survivalTree from "@/data/hunter/survival/tree.json";

export const Hunter: ParsedClassTalents = {
  BEAST_MASTERY: {
    GENERAL: { TALENTS: parser.parse(beastMasteryGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(beastMasteryTree), LIMIT: SPEC_TREE_LIMIT },
  },
  MARKSMANSHIP: {
    GENERAL: { TALENTS: parser.parse(marksmanshipGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(marksmanshipTree), LIMIT: SPEC_TREE_LIMIT },
  },
  SURVIVAL: {
    GENERAL: { TALENTS: parser.parse(survivalGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(survivalTree), LIMIT: SPEC_TREE_LIMIT },
  },
};
