import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps as NextAppProps } from "next/app";
import Amplify from "aws-amplify";

import awsconfig from "../aws-exports";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
Amplify.configure({
  ...awsconfig,
  ssr: true,
});

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

type CustomPageProps = {
  hideHeader: boolean;
};

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  return (
    <AuthContext>
      <ChakraProvider resetCSS theme={theme}>
        {!pageProps.hideHeader && <Navbar />}
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </AuthContext>
  );
}

export default MyApp;
