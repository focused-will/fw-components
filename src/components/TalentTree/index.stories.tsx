import React from "react";
import { Story } from "@storybook/react";

import { Priest } from "lib/trees/priest";
import { Druid } from "lib/trees/druid";
import { TalentTree, TalentTreeProps } from ".";

export default {
  title: "Talent Tree",
  component: TalentTree,
  argTypes: {},
};

const Template: Story<TalentTreeProps> = (args) => <TalentTree {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  talentNodes: Druid.BALANCE.TREE,
};
