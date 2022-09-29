import React, { PropsWithRef } from "react";
import { TalentNodeData } from "../types";
import { MultiTalentNode } from "./MultiTalentNode";
import { Button } from "./style";

type Props = PropsWithRef<{
  talent: TalentNodeData;
  className: string;
  id: string;
}>;

export const TalentNode = React.forwardRef<HTMLButtonElement, Props>(
  ({ talent, className, id }, ref) => {
    return "left" in talent ? (
      <Button
        id={id}
        ref={ref}
        className={className}
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
        id={id}
        ref={ref}
        className={className}
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
);
