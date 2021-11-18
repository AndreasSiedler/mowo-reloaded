import Storage from "@aws-amplify/storage";
import { Box } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import FileHeader from "../FileHeader";

interface Props {
  file: File;
  storageKey?: string;
  onDelete: (file: File) => void;
  onUpload: (file: File, key: string) => void;
}

/**
 * Renders a file upload element with progressbar and a fileheader
 * @param {File} file
 * @param {string} storageKey
 * @param {Function} onDelete
 * @param {Function} onUpload
 * @return {ReactElement}
 */
export default function SingleFileUploadWithProgress({
  file,
  storageKey,
  onDelete,
  onUpload,
}: Props): ReactElement {
  const [progress, setProgres] = useState(0);

  useEffect(() => {
    async function upload(): Promise<void> {
      // Upload file and receive image key
      const key = await uploadFile(file, setProgres);
      onUpload(file, key);
    }
    // if no storage key available upload the file to storage
    if (!storageKey) {
      upload();
    }
  }, []);

  return (
    <Box>
      <FileHeader file={file} onDelete={onDelete} />
      <Progress value={progress} />
    </Box>
  );
}

async function uploadFile(file: File, onProgress: (percentage: number) => void) {
  try {
    const result = await Storage.put(file.name, file, {
      contentType: "image/png", // contentType is optional
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        const percentage = (progress.loaded / progress.total) * 100;
        onProgress(Math.round(percentage));
      },
    });
    return result.key;
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
}
