import { styled } from "style";

export const IconImg = styled("img", {
  transition: "filter 0.15s ease-in-out",
  variants: {
    invested: {
      false: {
        filter: "grayscale(90%) brightness(0.6)",
        "&:hover": {
          filter: "grayscale(50%) brightness(0.8)",
        },
      },
      true: {
        filter: "none",
      },
    },
  },
});
