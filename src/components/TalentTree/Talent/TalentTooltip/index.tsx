import React, { PropsWithChildren } from "react";
import { StyledTooltipArrow, StyledTooltipContent } from "./styled";

type Props = {};

function TalentTooltip({ children }: PropsWithChildren<Props>) {
  return (
    <StyledTooltipContent>
      <StyledTooltipArrow />
      {children}
    </StyledTooltipContent>
  );
}

export { TalentTooltip };
