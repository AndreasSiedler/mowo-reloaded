import { FormProvider, useForm } from "react-hook-form";
import { Button, Container } from "@chakra-ui/react";
import FormFieldsGenerator from "./FormFieldsGenerator";
import React, { ReactElement, useEffect } from "react";

type FormGeneratorProps = {
  formData: Record<string, any>;
  defaults: Record<string, any>;
  onSubmit: (data) => void;
};

/**
 * Renders a dynamic created form
 * @param {Record<string, any>} formData
 * @param {Record<string, any>} defaults
 * @return {ReactElement}
 */
export default function FormGenerator({
  formData,
  defaults,
  onSubmit,
}: FormGeneratorProps): ReactElement {
  const methods = useForm();
  // Reset form values with default values
  useEffect(() => {
    methods.reset(defaults);
  }, []);

  return (
    <Container maxW="container.xl">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <FormFieldsGenerator data={formData} />
          <Button type="submit">Speichern</Button>
        </form>
      </FormProvider>
    </Container>
  );
}
