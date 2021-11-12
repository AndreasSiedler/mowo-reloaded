import React from "react";
import { Grid, Box, Stack, useColorModeValue } from "@chakra-ui/react";
import DynamicFormField from "./DynamicFormField";

type FormFieldsGeneratorProps = {
  data: any;
};

export default function FormFieldsGenerator(props: FormFieldsGeneratorProps) {
  const { data } = props;

  return (
    <>
      {data.formBlocks.map((block) => (
        <Grid key={block.title} templateColumns="repeat(2, 1fr)" gap={6}>
          <Box>
            <h4>{block.title}</h4>
            <p>{block.content}</p>
          </Box>
          <Box rounded="lg" bg={useColorModeValue("white", "gray.700")} boxShadow="lg" p="8">
            <Stack spacing="4">
              {block.inputs.map((input) => {
                return <DynamicFormField key={input.name} {...input} />;
              })}
            </Stack>
          </Box>
        </Grid>
      ))}
    </>
  );
}
