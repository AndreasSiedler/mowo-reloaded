import { Box, Text, VStack } from "@chakra-ui/layout";
import React, { ReactElement, useCallback, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { Center, Icon } from "@chakra-ui/react";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import SingleFileUploadWithProgress from "./SingleFileUploadWithProgress";

export interface UploadableFile {
  file: File;
  errors: FileError[];
}

/**
 * Renders a image drop zone with image previews
 * @return {ReactElement}
 */
export default function ImageDropzone(): ReactElement {
  const [files, setFiles] = useState<UploadableFile[]>([]);

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((curr) => [...curr, ...mappedAcc, ...rejFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: onDrop,
  });

  return (
    <>
      <Box
        border="dotted"
        borderRadius="lg"
        borderColor="gray.300"
        borderWidth="medium"
        {...getRootProps({ className: "dropzone" })}
      >
        <Center height="200px">
          <input {...getInputProps()} />
          <VStack>
            <Icon w="24" h={"24"} as={BsFillCloudArrowUpFill} color="gray.500" />
            <Text align="center">Drag and drop some files here, or click to select files</Text>
          </VStack>
        </Center>
      </Box>
      {files.map((fileWrapper, idx) => (
        <SingleFileUploadWithProgress key={idx} file={fileWrapper.file} />
      ))}
      {JSON.stringify(files)}
    </>
  );
}
