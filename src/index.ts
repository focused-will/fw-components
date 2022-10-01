/**
 * Component exports
 */
export { TalentTree } from "components/TalentTree";

/**
 * Helper exports
 */
import { Priest, Druid } from "lib/trees";
export const SUPPORTED_SPECS = {
  PRIEST: Priest,
  DRUID: Druid,
};
