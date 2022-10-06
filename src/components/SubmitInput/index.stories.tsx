import React from "react";
import { Story } from "@storybook/react";
import { SubmitInput, SubmitInputProps } from "./index";

export default {
  title: "atom/SubmitInput",
  component: SubmitInput,
  argTypes: {},
};

const SingleTemplate: Story<SubmitInputProps> = (args) => <SubmitInput {...args} />;

export const Standard = SingleTemplate.bind({});
Standard.args = {
  onSubmit: console.log,
  label: "Import String",
};
