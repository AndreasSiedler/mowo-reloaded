import { UseToastOptions } from "@chakra-ui/toast"

export const toastPosition = "bottom-right"
export const toastSuccessConfig: UseToastOptions = {
        title: "Space updated.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      }
export const toastErrorConfig: UseToastOptions = {
        title: "Failure.",
        description: "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      }