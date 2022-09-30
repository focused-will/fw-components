import React from "react";
import { IconImg } from "./styled";

type Props = {
  icon: string;
  invested: boolean;
};

const TalentIcon = ({ icon, invested }: Props) => {
  return (
    <IconImg
      className="talent-icon"
      invested={invested}
      src={`https://render.worldofwarcraft.com/us/icons/56/${icon}.jpg`}
    />
  );
};

TalentIcon.toString = () => ".talent-icon";

export { TalentIcon };
