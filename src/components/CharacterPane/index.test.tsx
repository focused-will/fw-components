import React from "react";
import { render } from "@testing-library/react";

import CharacterPane from "./index";
import { createStats, Stats } from "../../lib/stats";
import { Specs } from "../../types";

const mockStats = () =>
  createStats({
    intellect: 1,
    haste: 1,
    mastery: 1,
    crit: 1,
    versatility: 1,
  });

describe("CharacterPane", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <CharacterPane stats={mockStats()} spec={Specs.DiscPriest} />
    );
    expect(baseElement).toBeTruthy();
  });

  it("should pass the spec and stats to children", () => {
    const spec = Specs.DiscPriest;
    const stats = mockStats();
    const TestComponent = (props) => (
      <div
        data-testid="child"
        data-spec={props.spec}
        data-stats={JSON.stringify(props.stats)}
      />
    );

    const { getByTestId } = render(
      <CharacterPane spec={spec} stats={stats}>
        <TestComponent />
      </CharacterPane>
    );
    const child = getByTestId("child");
    expect(child).toHaveAttribute("data-spec", spec);
    expect(child).toHaveAttribute("data-stats", JSON.stringify(stats));
  });
});
