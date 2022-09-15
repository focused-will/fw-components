// write a storybook configuration for this component

import React from "react";

export default {
  title: "Character Pane",
  component: <div></div>,
  argTypes: {},
};

const Template = (args) => <div {...args}></div>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  disabled: false,
  text: "Primary",
};
