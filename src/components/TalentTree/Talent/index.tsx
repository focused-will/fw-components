import React, { PropsWithRef } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

import { MultiTalentNode } from "./MultiTalentNode";
import { ITalentNode } from "../hooks/useTalentTree";
import { Button, MultiSelectContainer, InvestmentSpan } from "./style";
import { TalentIcon } from "./TalentIcon";
import { TalentNodeData } from "../types";
import { TalentTooltip } from "./TalentTooltip";

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
  function handleLeftClick() {
    invest(talent.data);
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
        talent={talent}
        invest={invest}
        uninvest={uninvest}
        left={talent.data.left}
        right={talent.data.right}
        invested={
          talent.investment === talent.data.capacity || talent.investment > 0
        }
      />
    </MultiSelectContainer>
  ) : (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger asChild>
        <Button
          talentType={talent.data.talentType as any}
          id={id}
          onClick={handleLeftClick}
          onContextMenu={handleRightClick}
          className={className}
          style={{
            gridRow: talent.data.row,
            gridColumn: talent.data.column,
          }}
        >
          <TalentIcon
            icon={talent.data.icon}
            invested={
              talent.investment === talent.data.capacity ||
              talent.investment > 0
            }
          />
          {talent.investment > 0 && talent.data.capacity > 1 && (
            <InvestmentSpan>{talent.investment}</InvestmentSpan>
          )}
        </Button>
      </Tooltip.Trigger>
      <TalentTooltip>{talent.data.name}</TalentTooltip>
    </Tooltip.Root>
  );
};
