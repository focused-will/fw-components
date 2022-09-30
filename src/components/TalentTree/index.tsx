import React, { useRef } from "react";
import Xarrow from "react-xarrows";

import { Main } from "./style";
import { TalentNodeData } from "./types";
import { TalentNode } from "./Talent/index";

export type TalentTreeProps = {
  talents: TalentNodeData[];
};

export function TalentTree({ talents }: TalentTreeProps) {
  const ref = useRef<{ [key: number]: HTMLElement }>({});

  return (
    <>
      <Main>
        {talents.map((talent) => (
          <TalentNode
            id={`${talent.cell}`}
            ref={(el) => {
              if (!!el) ref.current[talent.cell] = el;
            }}
            className={`talent-${talent.cell}`}
            key={`talent-${talent.cell}`}
            talent={talent}
          />
        ))}
      </Main>

      {talents.map((talent) => {
        return (
          "links" in talent &&
          talent?.links?.map((link) => (
            <Xarrow
              strokeWidth={1}
              curveness={0}
              startAnchor="middle"
              endAnchor="middle"
              color="black"
              headSize={5}
              start={`${talent.cell}`}
              end={`${link}`}
            />
          ))
        );
      })}
    </>
  );
}
