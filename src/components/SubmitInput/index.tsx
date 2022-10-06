import React, { ComponentPropsWithoutRef } from "react";
import { useState } from "react";

export interface SubmitInputProps extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> {
  label?: string;
  submitText?: string;
  onSubmit?: (value: string) => void;
}

export function SubmitInput({ onSubmit, label, submitText, ...rest }: SubmitInputProps) {
  const [value, setValue] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} {...rest}>
      {label && <label htmlFor="submit-form-input">{label}</label>}
      <input
        id="submit-form-input"
        name="submit-form-input"
        onChange={(e) => setValue(e.target.value)}
        type="text"
      />
      <input type="submit" value={submitText || "Submit"} />
    </form>
  );
}
