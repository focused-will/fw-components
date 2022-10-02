import { Arrow, Content } from "@radix-ui/react-tooltip";
import { styled } from "@/style";

export const StyledTooltipContent = styled(Content, {
  zIndex: 2,
  backgroundColor: "$gray1",
  border: "2px solid $yellow7",
  borderRadius: "$sm",
  padding: "$2",
  color: "$gray12",
  fontSize: "$sm",
  fontFamily: "$sans",
  fontWeight: "$bold",
  boxShadow: "$sm",
});

export const StyledTooltipArrow = styled(Arrow, {
  fill: "$yellow7",
});
