import Storage from "@aws-amplify/storage";
import React, { ReactElement, useEffect, useState } from "react";

interface Props {
  file: File;
}

export default function SingleFileUploadWithProgress({ file }: Props): ReactElement {
  const [progress, setProgres] = useState(0);
  useEffect(() => {
    async function upload() {
      await uploadFile(file, setProgres);
    }

    upload();
  }, []);

  return <div>SFU {progress}</div>;
}

async function uploadFile(file: File, onProgress: (percentage: number) => void) {
  try {
    await Storage.put(file.name, file, {
      contentType: "image/png", // contentType is optional
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        const percentage = (progress.loaded / progress.total) * 100;
        onProgress(Math.round(percentage));
      },
    });
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
}
