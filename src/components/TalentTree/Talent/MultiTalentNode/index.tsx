import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

import { TalentIcon } from "../TalentIcon";
import { HalfButton } from "./style";
import { TalentNodeData } from "../../types";
import { ITalentNode } from "../../hooks/useTalentTree";
import { TalentTooltip } from "../TalentTooltip";

interface TalentData {
  id: number;
  icon: string;
  name: string;
}

type Props = {
  left: TalentData;
  right: TalentData;
  invested: boolean;
  talent: ITalentNode;
  invest: (talent: TalentNodeData, spellId?: number) => void;
  uninvest: (talent: TalentNodeData, spellId?: number) => void;
};

export function MultiTalentNode({ left, right, invested, talent, invest, uninvest }: Props) {
  const leftSelected = invested && talent.selectedId === left.id;
  const rightSelected = invested && talent.selectedId === right.id;

  return (
    <>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <HalfButton
            selected={leftSelected}
            onClick={() => invest(talent.data, left.id)}
            onContextMenu={(e) => {
              e.preventDefault();
              uninvest(talent.data, left.id);
            }}
          >
            <TalentIcon icon={left.icon} invested={leftSelected} />
          </HalfButton>
        </Tooltip.Trigger>
        <TalentTooltip>{left.name}</TalentTooltip>
      </Tooltip.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <HalfButton
            selected={rightSelected}
            onClick={() => invest(talent.data, right.id)}
            onContextMenu={(e) => {
              e.preventDefault();
              uninvest(talent.data, right.id);
            }}
          >
            <TalentIcon icon={right.icon} invested={rightSelected} />
          </HalfButton>
        </Tooltip.Trigger>
        <TalentTooltip>{right.name}</TalentTooltip>
      </Tooltip.Root>
    </>
  );
}
