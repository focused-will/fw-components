import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";
import { GENERAL_TREE_LIMIT, SPEC_TREE_LIMIT } from "../constants";
import { ParsedClassTalents } from "../types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Shaman
 */
import elementalGeneral from "@/data/shaman/elemental/general.json";
import elementalTree from "@/data/shaman/elemental/tree.json";

import enhancementGeneral from "@/data/shaman/enhancement/general.json";
import enhancementTree from "@/data/shaman/enhancement/tree.json";

import restorationGeneral from "@/data/shaman/restoration/general.json";
import restorationTree from "@/data/shaman/restoration/tree.json";

export const Shaman: ParsedClassTalents = {
  ELEMENTAL: {
    SLUG: "shaman/elemental",
    GENERAL: { TALENTS: parser.parse(elementalGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(elementalTree), LIMIT: SPEC_TREE_LIMIT },
  },
  ENHANCEMENT: {
    SLUG: "shaman/enhancement",
    GENERAL: { TALENTS: parser.parse(enhancementGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(enhancementTree), LIMIT: SPEC_TREE_LIMIT },
  },
  RESTORATION: {
    SLUG: "shaman/restoration",
    GENERAL: { TALENTS: parser.parse(restorationGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(restorationTree), LIMIT: SPEC_TREE_LIMIT },
  },
};
