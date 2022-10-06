import React from "react";
import { Story } from "@storybook/react";

import * as Classes from "@/lib/trees";
import { TalentSetProps, TalentSet } from ".";

export default {
  title: "organism/TalentSet",
  component: TalentSet,
  argTypes: {},
};

const SingleTemplate: Story<TalentSetProps> = (args) => <TalentSet {...args} />;

export const Standard = SingleTemplate.bind({});
Standard.args = {
  classTalents: Classes.Priest.DISCIPLINE,
  onChange: console.log,
};
