import Storage from "@aws-amplify/storage";
import React, { ReactElement, useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";

interface StorageImageProps {
  key: string;
}

export default function StorageImage({ key }: StorageImageProps): ReactElement {
  const [storageImageUrl, setStorageImageUrl] = useState<string>();

  useEffect(() => {
    async function getImageUrlFromStorage() {
      try {
        const signedUrl = await Storage.get(key);
        setStorageImageUrl(signedUrl);
      } catch (error) {
        console.error(error);
      }
    }

    getImageUrlFromStorage();
  }, []);

  return <Image src={storageImageUrl} alt={`Alt pictore name`} />;
}
