import React from "react";

import { Main } from "./style";
import { TalentNodeData } from "./types";
import { TalentNode } from "./Talent/index";

type Props = {
  talents: TalentNodeData[];
};

export function TalentTree({ talents }: Props) {
  return (
    <Main>
      {talents.map((talent) => (
        <TalentNode key={talent.cell} talent={talent} />
      ))}
    </Main>
  );
  // return <div>TalentTree</div>;
}
