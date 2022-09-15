import React from "react";
import { render } from "@testing-library/react";

import CharacterPane from "./index";

describe("CharacterPane", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CharacterPane />);
    expect(baseElement).toBeTruthy();
  });
});
