import { styled } from "style";
import { TalentIcon } from "../TalentIcon";

export const HalfButton = styled("button", {
  display: "inline-block",
  width: "50%",
  height: "100%",
  outline: 0,
  border: 0,
  padding: 0,

  "&:hover": {
    cursor: "pointer",
  },

  [`& ${TalentIcon}`]: {
    objectFit: "cover",
  },
});
