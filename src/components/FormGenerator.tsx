import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import FormFieldsGenerator from "./FormFieldsGenerator";
import React from "react";

type FormGeneratorProps = {
  formData: any;
};

export default function FormGenerator(props: FormGeneratorProps) {
  const { formData } = props;

  const methods = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <FormFieldsGenerator data={formData} />
        <Button type="submit">Speichern</Button>
      </form>
    </FormProvider>
  );
}
