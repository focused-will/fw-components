import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";
import { GENERAL_TREE_LIMIT, SPEC_TREE_LIMIT } from "../constants";
import { ParsedClassTalents } from "../types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Mage
 */
import arcaneGeneral from "@/data/mage/arcane/general.json";
import arcaneTree from "@/data/mage/arcane/tree.json";

import fireGeneral from "@/data/mage/fire/general.json";
import fireTree from "@/data/mage/fire/tree.json";

import frostGeneral from "@/data/mage/frost/general.json";
import frostTree from "@/data/mage/frost/tree.json";

export const Mage: ParsedClassTalents = {
  ARCANE: {
    GENERAL: { TALENTS: parser.parse(arcaneGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(arcaneTree), LIMIT: SPEC_TREE_LIMIT },
  },
  FIRE: {
    GENERAL: { TALENTS: parser.parse(fireGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(fireTree), LIMIT: SPEC_TREE_LIMIT },
  },
  FROST: {
    GENERAL: { TALENTS: parser.parse(frostGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(frostTree), LIMIT: SPEC_TREE_LIMIT },
  },
};
