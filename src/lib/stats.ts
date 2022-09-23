export interface Stats {
  // Haste in percentage
  haste: number;
  // Crit in percentage
  crit: number;
  // Mastery in percentage
  mastery: number;
  // Versatility in percentage
  versatility: number;
  // Raw intellect
  intellect: number;
}

/**
 * These are stats that should be expressed as percentages
 */
const PERCENTAGE_STATS: (keyof Stats)[] = [
  "haste",
  "crit",
  "mastery",
  "versatility",
];

/**
 * Helper function to generate a stats object with validation.
 * @param stats An object describing the character statistics
 * @returns A verified stats object
 */
export function createStats(stats: Stats) {
  PERCENTAGE_STATS.forEach((statName) => {
    if (stats[statName] > 3 || stats[statName] < 0) {
      throw new Error(
        `Stat "${statName}" must be a decimal percentage, e.g. 0.1 for 10%`
      );
    }
  });

  return { ...stats };
}
