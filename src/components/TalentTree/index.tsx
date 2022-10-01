import React from "react";
import Xarrow from "react-xarrows";

import { Main } from "./style";
import { TalentNodeData } from "./types";
import { useTalentTree } from "./hooks/useTalentTree";
import { TalentNode } from "./Talent/index";

export type TalentTreeProps = {
  talentNodes: TalentNodeData[];
};

export function TalentTree({ talentNodes }: TalentTreeProps) {
  const { talents, invest, uninvest } = useTalentTree(talentNodes);

  return (
    <>
      {/* Render main talent body */}
      <Main>
        {talents.map((talent) => (
          <TalentNode
            invest={invest}
            uninvest={uninvest}
            id={`${talent.data.cell}`}
            className={`talent-${talent.data.cell}`}
            key={`talent-${talent.data.cell}`}
            talent={talent}
          />
        ))}
      </Main>

      {/* Render out links */}
      {talents.map((talent) => {
        return (
          "links" in talent.data &&
          talent.data?.links?.map((link) => (
            <Xarrow
              key={`${talent.data.cell}+${link}`}
              strokeWidth={1}
              curveness={0}
              startAnchor="middle"
              endAnchor="middle"
              color="black"
              headSize={5}
              start={`${talent.data.cell}`}
              end={`${link}`}
            />
          ))
        );
      })}
    </>
  );
}
