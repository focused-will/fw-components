import React from "react";
import { Story } from "@storybook/react";

import * as Classes from "@/lib/trees";
import { TalentSetProps, TalentSet } from ".";
import { DemonHunter } from "../../lib/trees/demon-hunter/index";

export default {
  title: "TalentSet",
  component: TalentSet,
  argTypes: {},
};

const SingleTemplate: Story<TalentSetProps> = (args) => <TalentSet {...args} />;

export const Single = SingleTemplate.bind({});
Single.args = {
  classTalents: Classes.DemonHunter.HAVOC,
  onChange: console.log,
};
