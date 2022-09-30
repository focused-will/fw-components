import React, { PropsWithRef, useState } from "react";

import { TalentNodeData } from "../types";
import { MultiTalentNode } from "./MultiTalentNode";
import { Button, InvestmentSpan } from "./style";
import { TalentIcon } from "./TalentIcon";

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
        <MultiTalentNode
          left={talent.left}
          right={talent.right}
          invested={invested > 0}
        />
        <InvestmentSpan>{invested}</InvestmentSpan>
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
        <TalentIcon icon={talent.icon} invested={invested > 0} />
        <InvestmentSpan>{invested}</InvestmentSpan>
      </Button>
    );
  }
);
