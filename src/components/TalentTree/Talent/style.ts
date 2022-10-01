import { styled } from "style";
import { TalentIcon } from "./TalentIcon";

const mutualStyling = {
  position: "relative",
  zIndex: 1,
  border: "1px solid $gray6",
  flex: "1 1 0",
  width: "$s",
  height: "$s",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "content-box",
  borderRadius: "$round",
  overflow: "hidden",

  "&:hover": {
    border: "1px solid $yellow6",
    cursor: "pointer",
  },
};

export const Button = styled("button", {
  ...mutualStyling,
  padding: 0,

  [`& ${TalentIcon}`]: {
    width: "100%",
    height: "100%",
  },
});

export const MultiSelectContainer = styled("div", {
  ...mutualStyling,
  variants: {
    multi: {
      true: {},
    },
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
