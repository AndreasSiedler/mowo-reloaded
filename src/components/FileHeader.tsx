import { Button } from "@chakra-ui/button";
import { HStack, Spacer, Text } from "@chakra-ui/layout";
import React, { ReactElement } from "react";

interface Props {
  file: File;
  onDelete: (file: File) => void;
}

export default function FileHeader({ file, onDelete }: Props): ReactElement {
  return (
    <HStack>
      <Text>{file.name}</Text>
      <Spacer />
      <Button onClick={() => onDelete(file)}>Delete</Button>
    </HStack>
  );
}
