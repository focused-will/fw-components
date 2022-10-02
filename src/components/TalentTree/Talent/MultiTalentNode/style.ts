import { styled } from "@/style";
import { TalentIcon } from "../TalentIcon";

export const HalfButton = styled("button", {
  position: "relative",
  display: "inline-block",
  width: "50%",
  height: "100%",
  outline: 0,
  border: 0,
  padding: 0,
  overflow: "hidden",

  "&:hover": {
    cursor: "pointer",
  },

  [`& ${TalentIcon}`]: {
    objectFit: "cover",
    objectPosition: "center",
    width: "100%",
    height: "100%",
  },

  variants: {
    selected: {
      true: {
        zIndex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      },
    },
  },
});
