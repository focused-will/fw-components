import React from "react";
import { Story } from "@storybook/react";

import { Priest } from "@/lib/trees/priest";
import { Druid } from "@/lib/trees/druid";
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
    <>
      <TalentTree {...args.left} />
      <TalentTree {...args.right} />
    </>
  );
};

export const Single = SingleTemplate.bind({});
Single.args = {
  talentNodes: Druid.BALANCE.TREE,
  onChange: console.log,
};

export const Double = DoubleTemplate.bind({});
Double.args = {
  left: {
    talentNodes: Druid.BALANCE.GENERAL,
    style: { width: "40%", display: "inline-grid" },
  },
  right: {
    talentNodes: Druid.BALANCE.TREE,
    style: { width: "40%", display: "inline-grid" },
  },
};
