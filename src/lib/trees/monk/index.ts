import { z } from "zod";
import { TalentNodeDataSchema } from "@/components/TalentTree/types";
import { GENERAL_TREE_LIMIT, SPEC_TREE_LIMIT } from "../constants";
import { ParsedClassTalents } from "../types";

const parser = z.array(TalentNodeDataSchema);

/**
 * Monk
 */
import brewmasterGeneral from "@/data/monk/brewmaster/general.json";
import brewmasterTree from "@/data/monk/brewmaster/tree.json";

import windwalkerGeneral from "@/data/monk/windwalker/general.json";
import windwalkerTree from "@/data/monk/windwalker/tree.json";

import mistweaverGeneral from "@/data/monk/mistweaver/general.json";
import mistweaverTree from "@/data/monk/mistweaver/tree.json";

export const Monk: ParsedClassTalents = {
  BREWMASTER: {
    SLUG: "monk/brewmaster",
    GENERAL: { TALENTS: parser.parse(brewmasterGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(brewmasterTree), LIMIT: SPEC_TREE_LIMIT },
  },
  WINDWALKER: {
    SLUG: "monk/windwalker",
    GENERAL: { TALENTS: parser.parse(windwalkerGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(windwalkerTree), LIMIT: SPEC_TREE_LIMIT },
  },
  MISTWEAVER: {
    SLUG: "monk/mistweaver",
    GENERAL: { TALENTS: parser.parse(mistweaverGeneral), LIMIT: GENERAL_TREE_LIMIT },
    TREE: { TALENTS: parser.parse(mistweaverTree), LIMIT: SPEC_TREE_LIMIT },
  },
};
