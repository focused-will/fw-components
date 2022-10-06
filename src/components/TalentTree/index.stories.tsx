import React from "react";
import { Story } from "@storybook/react";

import * as Classes from "@/lib/trees";
import { TalentTree, TalentTreeProps } from ".";

export default {
  title: "organism/Talent Tree",
  component: TalentTree,
  argTypes: {},
};

const SingleTemplate: Story<TalentTreeProps> = (args) => <TalentTree {...args} />;

export const Single = SingleTemplate.bind({});
Single.args = {
  talentNodes: Classes.Druid.BALANCE.TREE,
  onChange: console.log,
};
