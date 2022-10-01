import React, { PropsWithRef } from "react";
import { ITalentNode } from "../hooks/useTalentTree";

import { MultiTalentNode } from "./MultiTalentNode";
import { Button, MultiSelectContainer, InvestmentSpan } from "./style";
import { TalentIcon } from "./TalentIcon";
import { TalentNodeData } from "../types";

type Props = PropsWithRef<{
  talent: ITalentNode;
  className: string;
  id: string;
  invest: (talent: TalentNodeData) => void;
  uninvest: (talent: TalentNodeData) => void;
}>;

export const TalentNode = ({
  talent,
  className,
  id,
  invest,
  uninvest,
}: Props) => {
  function handleLeftClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.button === 0) {
      invest(talent.data);
    }
  }

  function handleRightClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    uninvest(talent.data);
  }

  return "left" in talent.data ? (
    <MultiSelectContainer
      id={id}
      className={className}
      multi
      style={{
        gridRow: talent.data.row,
        gridColumn: talent.data.column,
      }}
    >
      <MultiTalentNode
        left={talent.data.left}
        right={talent.data.right}
        invested={talent.investment > 0}
      />
    </MultiSelectContainer>
  ) : (
    <Button
      id={id}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
      className={className}
      style={{
        gridRow: talent.data.row,
        gridColumn: talent.data.column,
      }}
    >
      <TalentIcon icon={talent.data.icon} invested={talent.investment > 0} />
      {talent.investment > 0 && talent.data.capacity > 1 && (
        <InvestmentSpan>{talent.investment}</InvestmentSpan>
      )}
    </Button>
  );
};
