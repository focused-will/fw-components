import { blue, green, yellow, red, gray } from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

export const { styled, css } = createStitches({
  theme: {
    colors: {
      ...blue,
      ...green,
      ...yellow,
      ...red,
      ...gray,
    },
  },
});
