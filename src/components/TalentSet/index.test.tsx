import React from "react";
import { render } from "@testing-library/react";

import { TalentSet } from ".";
import { DemonHunter } from "@/lib/trees";

describe("TalentSet", () => {
  it("should render", () => {
    const { baseElement } = render(
      <TalentSet classTalents={DemonHunter.HAVOC} onChange={console.log} />
    );
    expect(baseElement).toBeTruthy();
  });
});
