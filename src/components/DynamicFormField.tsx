import React, { ReactElement } from "react";
import InputField from "./InputField";

type DynamicFormFieldProps = {
  label: string;
  name: string;
  type: "text" | "textarea" | "email";
  validation: object;
  rows?: string;
};

export default function DynamicFormField(props: DynamicFormFieldProps): ReactElement {
  return <>{(props.type === "text" || props.type === "email") && <InputField {...props} />}</>;
}
