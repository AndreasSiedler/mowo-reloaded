import React from "react";
import { Input, FormErrorMessage, FormControl, FormLabel } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type InputFieldProps = {
  label: string;
  name: string;
  type: "text" | "textarea" | "email";
  validation: object;
  rows?: string;
};

export default function InputField({ label, name, validation }: InputFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormControl isInvalid={Boolean(errors[name])} isRequired>
        <FormLabel id={name} htmlFor={name}>
          {label}
        </FormLabel>
        <Input id={name} type="text" placeholder="Email" {...register(name, validation)} />
        <FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
      </FormControl>
    </>
  );
}
