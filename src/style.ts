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
      sm: "4px",
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
    fonts: {
      sans: "-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif",
      serif:
        "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
      mono: "Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
    },
    shadows: {
      sm: `0.3px 0.5px 0.7px hsl(0deg 0% 58% / 0.34),
           0.4px 0.8px 1px -1.2px hsl(0deg 0% 58% / 0.34),
           1px 2px 2.5px -2.5px hsl(0deg 0% 58% / 0.34);`,
    },
  },
});
