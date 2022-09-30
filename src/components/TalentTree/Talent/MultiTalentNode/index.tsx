import React from "react";
import { TalentIcon } from "../TalentIcon";
import { HalfButton } from "./style";

interface TalentData {
  id: number;
  icon: string;
}

type Props = {
  left: TalentData;
  right: TalentData;
  invested: boolean;
};

export function MultiTalentNode({ left, right, invested }: Props) {
  return (
    <>
      <HalfButton>
        <TalentIcon icon={left.icon} invested={invested} />
      </HalfButton>
      <HalfButton>
        <TalentIcon icon={right.icon} invested={invested} />
      </HalfButton>
    </>
  );
}
