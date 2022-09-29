import React from "react";
import { TalentNodeData } from "../types";
import { MultiTalentNode } from "./MultiTalentNode";
import { Button } from "./style";

type Props = {
  talent: TalentNodeData;
};

export function TalentNode({ talent }: Props) {
  return "left" in talent ? (
    <Button
      multi
      style={{
        gridRow: talent.row,
        gridColumn: talent.column,
      }}
    >
      <MultiTalentNode left={talent.left} right={talent.right} />
    </Button>
  ) : (
    <Button
      style={{
        gridRow: talent.row,
        gridColumn: talent.column,
      }}
    >
      <img
        width={32}
        height={32}
        src={`https://render.worldofwarcraft.com/us/icons/56/${talent.icon}.jpg`}
      />
    </Button>
  );
}
