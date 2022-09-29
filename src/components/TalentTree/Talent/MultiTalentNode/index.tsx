import React from "react";
import { HalfImg } from "./style";

interface TalentData {
  id: number;
  icon: string;
}

type Props = {
  left: TalentData;
  right: TalentData;
};

export function MultiTalentNode({ left, right }: Props) {
  return (
    <>
      <HalfImg
        width={16}
        height={32}
        src={`https://render.worldofwarcraft.com/us/icons/56/${left.icon}.jpg`}
      />
      <HalfImg
        width={16}
        height={32}
        src={`https://render.worldofwarcraft.com/us/icons/56/${right.icon}.jpg`}
      />
    </>
  );
}
