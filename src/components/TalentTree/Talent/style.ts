import { styled } from "@/style";
import { TalentIcon } from "./TalentIcon";

const mutualStyling = {
  position: "relative",
  zIndex: 1,
  border: "2px solid $gray1",
  flex: "1 1 0",
  width: "$s",
  height: "$s",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "content-box",
  borderRadius: "$round",
  overflow: "hidden",
  boxShadow: "$sm",
  transition: "border 0.2s ease-in-out",

  "&:hover": {
    border: "2px solid $yellow6",
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

  variants: {
    talentType: {
      1: {
        borderRadius: "$sm",
      },
    },
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

  filter: "drop-shadow(0 0 3px black)",
  padding: "$1",

  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
