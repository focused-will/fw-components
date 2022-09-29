import { styled } from "@stitches/react";

export const Main = styled("main", {
  display: "grid",
  gridTemplateColumns: "repeat(17, auto)",
  gridTemplateRows: "repeat(10, auto)",
  gap: "4px",
  justifyContent: "center",
  justifyItems: "center",
});
