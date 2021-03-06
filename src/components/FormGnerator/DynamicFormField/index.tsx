import React, { ReactElement } from "react";
import {
  Input,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import ImageDropzone from "../../DropZone";
import { Image, ImageInput } from "../../../API";

type SelectOption = {
  label: string;
  value: string;
};

type DynamicFormFieldProps = {
  label: string;
  name: string;
  type: "text" | "textarea" | "email" | "select" | "dropzone";
  validation: object;
  placeholder?: string;
  options?: SelectOption[];
  rows?: string;
};

/**
 * Renders dynamic form fields
 * @return {ReactElement}
 */
export default function DynamicFormField({
  label,
  name,
  type,
  placeholder,
  options,
  validation,
}: DynamicFormFieldProps): ReactElement {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {(type === "text" || type === "email") && (
        <FormControl isInvalid={Boolean(errors[name])} isRequired>
          <FormLabel id={name} htmlFor={name}>
            {label}
          </FormLabel>
          <Input id={name} type="text" placeholder={label} {...register(name, validation)} />
          <FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
        </FormControl>
      )}
      {type === "textarea" && (
        <FormControl isInvalid={Boolean(errors[name])} isRequired>
          <FormLabel id={name} htmlFor={name}>
            {label}
          </FormLabel>
          <Textarea id={name} type="text" placeholder={label} {...register(name, validation)} />
          <FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
        </FormControl>
      )}
      {type === "select" && (
        <FormControl isInvalid={Boolean(errors[name])} isRequired>
          <FormLabel id={name} htmlFor={name}>
            {label}
          </FormLabel>
          <Select id={name} placeholder={placeholder} {...register(name, validation)}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
        </FormControl>
      )}
      {type === "dropzone" && (
        <FormControl isInvalid={Boolean(errors[name])} isRequired>
          <FormLabel id={name} htmlFor={name}>
            {label}
          </FormLabel>
          <ImageDropzone
            {...register(name, validation)}
            initFiles={getValues(name) as Image[]}
            onChange={(files: ImageInput[]) => {
              setValue(name, files);
            }}
          />
          <FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
        </FormControl>
      )}
    </>
  );
}
