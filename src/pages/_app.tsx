import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import Amplify from "aws-amplify";

import awsconfig from "../aws-exports";
import AuthContext from "../context/AuthContext";
Amplify.configure({
  ...awsconfig,
  ssr: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContext>
  );
}

export default MyApp;
