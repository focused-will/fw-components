import React from "react";
import { render } from "@testing-library/react";

import { TalentTree } from ".";
import { discipline } from "lib/trees/priest";

describe("TalentTree", () => {
  it("should render", () => {
    const { baseElement } = render(<TalentTree talents={discipline} />);
    expect(baseElement).toBeTruthy();
  });
});
