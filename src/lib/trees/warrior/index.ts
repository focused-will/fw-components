import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";
import { GENERAL_TREE_LIMIT, SPEC_TREE_LIMIT } from "../constants";
import { ParsedClassTalents } from "../types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Warropr
 */
import armsGeneral from "@/data/warrior/arms/general.json";
import armsTree from "@/data/warrior/arms/tree.json";

import furyGeneral from "@/data/warrior/fury/general.json";
import furyTree from "@/data/warrior/fury/tree.json";

import protectionGeneral from "@/data/warrior/protection/general.json";
import protectionTree from "@/data/warrior/protection/tree.json";

export const Warrior: ParsedClassTalents = {
  ARMS: {
    SLUG: "warrior/arms",
    GENERAL: { TALENTS: parser.parse(armsGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(armsTree), LIMIT: SPEC_TREE_LIMIT },
  },
  FURY: {
    SLUG: "warrior/fury",
    GENERAL: { TALENTS: parser.parse(furyGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(furyTree), LIMIT: SPEC_TREE_LIMIT },
  },
  PROTECTION: {
    SLUG: "warrior/protection",
    GENERAL: { TALENTS: parser.parse(protectionGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(protectionTree), LIMIT: SPEC_TREE_LIMIT },
  },
};
