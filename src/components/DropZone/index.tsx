import { Box, Text, VStack } from "@chakra-ui/layout";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { Center, Icon, StackDivider } from "@chakra-ui/react";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import SingleFileUploadWithProgress from "./FileHeaderWithProgress";
import { Image, ImageInput } from "../../API";
import UploadError from "./UploadError";
import Storage from "@aws-amplify/storage";

export interface UploadableFile {
  file: File;
  errors: FileError[];
  key?: string;
}

export interface ImageDropzoneProps {
  initFiles?: Image[];
  onChange: (files: ImageInput[]) => void;
}

/**
 * Renders a image drop zone with image previews
 * @return {ReactElement}
 */
export default function ImageDropzone({ initFiles, onChange }: ImageDropzoneProps): ReactElement {
  const [files, setFiles] = useState<UploadableFile[]>([]);

  // Set initial values
  useEffect(() => {
    if (!initFiles) return;
    async function loadImages() {
      const mappedAndFilteredInitFiles = await Promise.all<UploadableFile>(
        initFiles
          .filter((initFile) => files.some((file) => file.key !== initFile.key))
          .map((initFile) => getUploadableFileFromKey(initFile.key))
      );
      setFiles((currFiles) => [...currFiles, ...mappedAndFilteredInitFiles]);
    }

    loadImages();
  }, [initFiles]);

  async function getUploadableFileFromKey(key: string): Promise<UploadableFile> {
    // get the signed URL string
    const result = await Storage.get(key, { download: true }); // get key from Storage.list
    const file = new File([result.Body as Blob], key);
    return { file: file, errors: [], key: key };
  }

  // Run callback onChange if files changes
  useEffect(() => {
    onChange(files.map((fw) => ({ key: fw.key })));
  }, [files]);

  function onDelete(file: File) {
    setFiles((currFiles) => currFiles.filter((fw) => fw.file !== file));
  }

  function onUpload(file: File, key: string) {
    setFiles((currFiles) =>
      currFiles.map((fw) => {
        if (fw.file === file) {
          return { ...fw, key };
        }
        return fw;
      })
    );
  }

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((curr) => [...curr, ...mappedAcc, ...rejFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ["image/*"],
    onDrop: onDrop,
    maxSize: 300 * 1024, // 300KB
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
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
        {files.map((fw, idx) => (
          <>
            {fw.errors.length ? (
              <UploadError key={idx} file={fw.file} errors={fw.errors} onDelete={onDelete} />
            ) : (
              <SingleFileUploadWithProgress
                key={idx}
                storageKey={fw.key}
                file={fw.file}
                onDelete={onDelete}
                onUpload={onUpload}
              />
            )}
          </>
        ))}
      </VStack>
    </>
  );
}

/**
 * Maps an server Image object to an UploadableFile, which is needed by the Dropzone component.
 * @param {Image} img
 * @return {UploadableFile}
 */
// async function mapImageInputToUploadableImage(img: Image): Promise<UploadableFile> {
//   const result = await Storage.get(img.key, { download: true });
//   const uplFile: UploadableFile = {
//     file: new File([result.Body as Blob], "name"),
//     key: img.key,
//     errors: [],
//   };
//   return uplFile;
// }
