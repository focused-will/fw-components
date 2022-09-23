import React, { Children, cloneElement, PropsWithChildren } from "react";
import { Specs } from "types";
import { Stats } from "lib/stats";
import Spell from "components/Spell";

type Props = PropsWithChildren<{
  spec: Specs;
  stats: Stats;
}>;

type ChildProps = PropsWithChildren<{
  spec: Specs;
  stats: Stats;
  index: number;
}>;

export default function CharacterPane({ children, spec, stats }: Props) {
  return (
    <div>
      {Children.map(children, (child, index) => {
        if (!React.isValidElement<ChildProps>(child)) {
          throw new Error("Invalid child");
        }

        return cloneElement<ChildProps>(child, { spec, stats, index });
      })}
    </div>
  );
}

function Test() {
  return (
    <CharacterPane
      stats={{ intellect: 1, versatility: 1, mastery: 1, crit: 1, haste: 1 }}
      spec={Specs.DiscPriest}
    >
      <Spell spellName="example" />
    </CharacterPane>
  );
}
