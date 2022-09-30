import { styled } from "style";
import { TalentIcon } from "./TalentIcon";

export const Button = styled("button", {
  position: "relative",
  zIndex: 1,
  border: "1px solid black",
  flex: "1 1 0",
  width: "$s",
  height: "$s",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "content-box",

  padding: 0,
  outline: 0,
  borderRadius: "$round",
  overflow: "hidden",
  "&:hover": {
    border: "1px solid red",
    cursor: "pointer",
  },
  variants: {
    multi: {
      true: {
        border: "1px solid blue",
      },
    },
  },
  [`& ${TalentIcon}`]: {
    width: "100%",
    height: "100%",
  },
});

export const InvestmentSpan = styled("span", {
  position: "absolute",
  color: "$gray12",
  fontWeight: "$extrabold",
  fontSize: "$lg",
  pointerEvents: "none",

  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
