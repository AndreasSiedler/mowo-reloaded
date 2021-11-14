import { Box, Text } from "@chakra-ui/layout";
import React, { ReactElement, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Center, SimpleGrid, Image, useToast } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { Storage } from "aws-amplify";

/**
 * Renders a image drop zone with image previews
 * @return {ReactElement}
 */
export default function ImageDropzone(): ReactElement {
  const toast = useToast();
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
    },
  });

  async function uploadImages(files: File[]) {
    files.forEach(async (file) => {
      try {
        await Storage.put(file.name, file, {
          contentType: "image/png", // contentType is optional
        });
      } catch (error) {
        toast({
          title: "Failure.",
          description: "Something went wrong.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    });
  }

  const thumbnails = files.map((file) => (
    <Box key={file.name} width="100%">
      <Image
        align="center"
        boxSize="200px"
        objectFit="cover"
        src={URL.createObjectURL(file)}
        alt={file.name}
        fallbackSrc="https://via.placeholder.com/150"
      />
    </Box>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Box>
      <Box as="aside">
        <SimpleGrid columns={[2, 2, 2, 3, 4]} spacing="4">
          {thumbnails}
          <Box
            width="100%"
            height="200px"
            border="1px dashed"
            borderRadius="lg"
            {...getRootProps({ className: "dropzone" })}
          >
            <Center>
              <input {...getInputProps()} />
              <DownloadIcon />
              <Text>Drag and drop some files here, or click to select files</Text>
            </Center>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
