import { blue, green, yellow, red, grayDark } from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

export const { styled, css } = createStitches({
  theme: {
    colors: {
      ...blue,
      ...green,
      ...yellow,
      ...red,
      ...grayDark,
    },
    sizes: {
      s: "48px",
      m: "48px",
      l: "64px",
    },
    radii: {
      round: "50%",
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
      extrabold: 900,
    },
    fontSizes: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
    },
    space: {
      0: "0px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
    },
  },
});
