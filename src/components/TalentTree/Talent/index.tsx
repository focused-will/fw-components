import React, { PropsWithRef, useState } from "react";
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
    const [invested, setInvested] = useState(0);

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
        <span>
          {invested} / {talent.capacity}
        </span>
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
        <span>
          {invested} / {talent.capacity}
        </span>
        <img
          width={32}
          height={32}
          src={`https://render.worldofwarcraft.com/us/icons/56/${talent.icon}.jpg`}
        />
      </Button>
    );
  }
);
