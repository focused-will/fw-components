import { styled } from "style";

export const IconImg = styled("img", {
  transition: "filter 0.15s ease-in-out",
  variants: {
    invested: {
      false: {
        filter: "grayscale(80%) brightness(0.4)",
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
