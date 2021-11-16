import { DeepPartial, FormProvider, UnpackNestedValue, useForm } from "react-hook-form";
import { Button, Container } from "@chakra-ui/react";
import FormFieldsGenerator from "./FormFieldsGenerator";
import React, { ReactElement, useEffect } from "react";

type FormGeneratorProps<T> = {
  formData: Record<string, any>;
  initialData: UnpackNestedValue<DeepPartial<T>>;
  onSubmit: (data) => void;
};

/**
 * Renders a dynamic created form
 * @param {Record<string, any>} formData
 * @param {T} initialData
 * @return {ReactElement}
 */
export default function FormGenerator<T>({
  formData,
  initialData,
  onSubmit,
}: FormGeneratorProps<T>): ReactElement {
  const methods = useForm<T>();
  // Reset form values with default values
  useEffect(() => {
    methods.reset(initialData);
  }, []);

  return (
    <Container maxW="container.xl">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <FormFieldsGenerator data={formData} />
          <Button type="submit">Speichern</Button>
        </form>
        <pre>{JSON.stringify(methods.getValues(), null, 2)}</pre>
      </FormProvider>
    </Container>
  );
}
