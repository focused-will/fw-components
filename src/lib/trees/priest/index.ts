import { z } from "zod";
import { TalentNodeDataSchema } from "components/TalentTree/types";

import generalData from "data/priest/general.json";
import disciplineData from "data/priest/discipline.json";
import shadowData from "data/priest/shadow.json";
import holyData from "data/priest/holy.json";

const parser = z.array(TalentNodeDataSchema);

const general = parser.parse(generalData);
const discipline = parser.parse(disciplineData);
const shadow = parser.parse(shadowData);
const holy = parser.parse(holyData);

export { general, discipline, shadow, holy };
