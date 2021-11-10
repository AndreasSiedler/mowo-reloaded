import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import Amplify from "aws-amplify";

import awsconfig from "../aws-exports";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
Amplify.configure({
  ...awsconfig,
  ssr: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
      <ChakraProvider resetCSS theme={theme}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </AuthContext>
  );
}

export default MyApp;
