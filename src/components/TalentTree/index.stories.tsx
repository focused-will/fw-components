import React from "react";
import { Story } from "@storybook/react";

import * as Classes from "@/lib/trees";
import { TalentTree, TalentTreeProps } from ".";
import { ParsedSpecTalents } from "../../lib/trees/types";

export default {
  title: "Talent Tree",
  component: TalentTree,
  argTypes: {},
};

const SingleTemplate: Story<TalentTreeProps> = (args) => <TalentTree {...args} />;
const DoubleTemplate: Story<{
  left: TalentTreeProps;
  right: TalentTreeProps;
}> = (args) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "48px",
      }}
    >
      <TalentTree {...args.left} />
      <TalentTree {...args.right} />
    </div>
  );
};

export const Single = SingleTemplate.bind({});
Single.args = {
  talentNodes: Classes.Druid.BALANCE.TREE,
  onChange: console.log,
};

export const Double = DoubleTemplate.bind({});
Double.args = {
  left: {
    talentNodes: Classes.Monk.MISTWEAVER.GENERAL,
    style: { display: "inline-grid" },
  },
  right: {
    talentNodes: Classes.Monk.MISTWEAVER.TREE,
    style: { display: "inline-grid" },
  },
};
