import React from "react";
import { Grid, Box, Stack, Heading, useColorModeValue, GridItem } from "@chakra-ui/react";
import DynamicFormField from "./DynamicFormField";

type FormFieldsGeneratorProps = {
  data: any;
};

export default function FormFieldsGenerator(props: FormFieldsGeneratorProps) {
  const { data } = props;

  return (
    <>
      {data.formBlocks.map((block) => (
        <Grid key={block.title} templateColumns="repeat(12, 1fr)" gap={10}>
          <GridItem colSpan={[12, 4]}>
            <Box>
              <Heading as="h4">{block.title}</Heading>
              <p>{block.content}</p>
            </Box>
          </GridItem>
          <GridItem colSpan={[12, 8]}>
            <Box rounded="lg" bg={useColorModeValue("white", "gray.700")} boxShadow="sm" p="8">
              <Stack spacing="4">
                {block.inputs.map((input) => {
                  return <DynamicFormField key={input.name} {...input} />;
                })}
              </Stack>
            </Box>
          </GridItem>
        </Grid>
      ))}
    </>
  );
}
