import { styled } from "@stitches/react";

export const Button = styled("button", {
  border: "1px solid black",
  flex: "1 1 0",
  width: "32px",
  height: "32px",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "content-box",

  padding: 0,
  outline: 0,
  borderRadius: "50%",
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
});
