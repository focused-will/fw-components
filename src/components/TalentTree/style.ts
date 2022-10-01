import { styled } from "style";

export const Main = styled("main", {
  display: "grid",
  gridTemplateColumns: "repeat(17, auto)",
  gridTemplateRows: "repeat(10, auto)",
  gap: "$2",
  justifyContent: "center",
  justifyItems: "center",
});
