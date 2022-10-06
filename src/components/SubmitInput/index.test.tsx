import React from "react";
import { createEvent, fireEvent, render } from "@testing-library/react";

import { SubmitInput } from ".";

describe("TalentSet", () => {
  it("should render", () => {
    const { baseElement } = render(<SubmitInput />);
    expect(baseElement).toBeTruthy();
  });

  it("should render a label", () => {
    const { getByText } = render(<SubmitInput label="Test" />);
    expect(getByText("Test")).toBeTruthy();
  });

  it("should render a submit button", () => {
    const { getByText } = render(<SubmitInput submitText="Test" />);
    expect(getByText("Test")).toBeTruthy();
  });

  it("invokes onSubmit as expected", () => {
    const onSubmit = jest.fn();
    const { getByText } = render(<SubmitInput onSubmit={onSubmit} />);
    const button = getByText("Submit");
    button.click();
    expect(onSubmit).toHaveBeenCalled();
  });
});
