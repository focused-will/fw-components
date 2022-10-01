import React from "react";
import { Story } from "@storybook/react";

import { discipline, general } from "lib/trees/priest";
import { TalentTree, TalentTreeProps } from ".";

export default {
  title: "Talent Tree",
  component: TalentTree,
  argTypes: {},
};

const Template: Story<TalentTreeProps> = (args) => <TalentTree {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  talentNodes: general,
};
