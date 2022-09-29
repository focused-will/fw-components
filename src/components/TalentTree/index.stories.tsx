import React from "react";

import { discipline, general } from "lib/trees/priest";
import { TalentTree } from ".";

export default {
  title: "Talent Tree",
  component: TalentTree,
  argTypes: {},
};

const Template = (args) => <TalentTree {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  talents: general,
};
