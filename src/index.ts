/**
 * Component exports
 */
export { TalentTree } from "./components/TalentTree";
export { TalentSet } from "./components/TalentSet";
export type { TalentSetReturn, TreeReturn } from "./components/TalentSet";

/**
 * Helper exports
 */
import * as Classes from "@/lib/trees";
export const SUPPORTED_SPECS = {
  DEATH_KNIGHT: Classes.DeathKnight,
  DEMON_HUNTER: Classes.DemonHunter,
  DRUID: Classes.Druid,
  EVOKER: Classes.Evoker,
  HUNTER: Classes.Hunter,
  MAGE: Classes.Mage,
  MONK: Classes.Monk,
  PALADIN: Classes.Paladin,
  PRIEST: Classes.Priest,
  ROGUE: Classes.Rogue,
  SHAMAN: Classes.Shaman,
  WARLOCK: Classes.Warlock,
  WARRIOR: Classes.Warrior,
};
