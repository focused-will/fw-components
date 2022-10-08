import React from "react";
import { render } from "@testing-library/react";

import { TalentTree } from ".";
import { Priest } from "@/lib/trees";
import { TalentNodeWithMetadata } from "@/lib/serialization/wowhead";
import { SelectedTalents } from "./hooks/useTalentTree";

const MOCK_TALENTS: TalentNodeWithMetadata[] = [
  {
    talentNodeData: {
      id: 81749,
      name: "Atonement",
      icon: "ability_priest_atonement",
      capacity: 1,
      cell: 8,
      row: 1,
      column: 9,
      talentType: 2,
      links: [23, 25, 27],
    },
    points: 1,
  },
  {
    talentNodeData: {
      id: 33206,
      name: "Pain Suppression",
      icon: "spell_holy_painsupression",
      capacity: 1,
      cell: 25,
      row: 2,
      column: 9,
      talentType: 1,
      links: [42],
    },
    points: 1,
  },
  {
    talentNodeData: {
      capacity: 1,
      cell: 42,
      row: 3,
      column: 9,
      talentType: 3,
      left: {
        id: 372991,
        name: "Pain Transformation",
        icon: "spell_holy_blessedrecovery",
        url: "https://www.wowhead.com/beta/spell=372991/pain-transformation",
      },
      right: {
        id: 373035,
        name: "Protector of the Frail",
        icon: "ability_racial_forceshield",
        url: "https://www.wowhead.com/beta/spell=373035/protector-of-the-frail",
      },
      links: [57, 59],
    },
    selectedId: 372991,
    points: 1,
  },
];

describe("TalentTree", () => {
  it("should render", () => {
    const { baseElement } = render(<TalentTree talentNodes={Priest.DISCIPLINE.GENERAL} />);
    expect(baseElement).toBeTruthy();
  });

  it("should invoke onChange when a talent is selected", () => {
    const onChange = jest.fn();
    render(
      <TalentTree
        talentNodes={Priest.DISCIPLINE.GENERAL}
        onChange={onChange}
        initialSelectedTalents={MOCK_TALENTS}
      />
    );

    const expected: SelectedTalents = new Map([
      [81749, { talentId: 81749, points: 1 }],
      [33206, { talentId: 33206, points: 1 }],
      [372991, { talentId: 372991, points: 1 }],
    ]);

    expect(onChange).toHaveBeenCalledWith(expected, { current: 3, limit: 31 });
  });
});
