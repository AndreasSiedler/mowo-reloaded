import { DeepPartial, FormProvider, UnpackNestedValue, useForm } from "react-hook-form";
import { Button, Container } from "@chakra-ui/react";
import FormFieldsGenerator from "./FormFieldsGenerator";
import React, { ReactElement, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import { Space } from "../../API";

type FormGeneratorProps<T> = {
  formData: Record<string, any>;
  initialData: UnpackNestedValue<DeepPartial<T>>;
  onSubmit: (data) => void;
};

/**
 * Renders a dynamic created form
 * @param {Record<string, any>} formData
 * @param {T} initialData
 * @param {function} onSubmit
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

  const debounceSubmit = useCallback(
    debounce((data: Space) => {
      onSubmit(data);
    }, 1000),
    []
  );

  useEffect(() => {
    methods.watch((value, { name, type }) => {
      if (type === "change") {
        debounceSubmit(value as Space);
      }
    });
  }, [methods.watch]);

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
