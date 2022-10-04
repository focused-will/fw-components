import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";
import { GENERAL_TREE_LIMIT, SPEC_TREE_LIMIT } from "../constants";
import { ParsedClassTalents } from "../types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Death Knight
 */
import bloodGeneral from "@/data/death-knight/blood/general.json";
import bloodTree from "@/data/death-knight/blood/tree.json";

import frostGeneral from "@/data/death-knight/frost/general.json";
import frostTree from "@/data/death-knight/frost/tree.json";

import unholyGeneral from "@/data/death-knight/unholy/general.json";
import unholyTree from "@/data/death-knight/unholy/tree.json";

export const DeathKnight: ParsedClassTalents = {
  BLOOD: {
    GENERAL: { TALENTS: parser.parse(bloodGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(bloodTree), LIMIT: SPEC_TREE_LIMIT },
  },
  FROST: {
    GENERAL: { TALENTS: parser.parse(frostGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(frostTree), LIMIT: SPEC_TREE_LIMIT },
  },
  UNHOLY: {
    GENERAL: { TALENTS: parser.parse(unholyGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(unholyTree), LIMIT: SPEC_TREE_LIMIT },
  },
};
