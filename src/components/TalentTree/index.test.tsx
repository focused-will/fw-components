import React from "react";
import { render } from "@testing-library/react";

import { TalentTree } from ".";
import { Priest } from "@/lib/trees";

describe("TalentTree", () => {
  it("should render", () => {
    const { baseElement } = render(
      <TalentTree talentNodes={Priest.DISCIPLINE.GENERAL} />
    );
    expect(baseElement).toBeTruthy();
  });
});
