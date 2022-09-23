import { Stats } from "lib/stats";
import React, { PropsWithChildren } from "react";
import { Specs } from "types";

type Props = PropsWithChildren<{
  spellName: string;
  index?: number;
  spec?: Specs;
  stats?: Stats;
}>;

export default function Spell({ spellName, index, spec, stats }: Props) {
  return <div>Spell</div>;
}
