import type { AppProps } from "next/app";
import splitbee from "@splitbee/web";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Toaster } from "react-hot-toast";
import { Provider } from "next-auth/client";
import { useEffect } from "react";
import { Global, css } from "@emotion/react";
import { prismDarkTheme, prismLightTheme } from "styles/prism";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect((): void => {
    splitbee.init();
  }, []);

  const GlobalStyle = ({ children }) => {
    const { colorMode } = useColorMode();

    return (
      <>
        <Global
          styles={css`
            ${colorMode === "light" ? prismLightTheme : prismDarkTheme};
            html {
              min-width: 356px;
              scroll-behavior: smooth;
            }
          `}
        />
        {children}
      </>
    );
  };

  return (
    <ChakraProvider>
      <GlobalStyle>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Provider session={pageProps.session}>
              <Component {...pageProps} />
              <div>
                <Toaster />
              </div>
            </Provider>
          </Hydrate>
        </QueryClientProvider>
      </GlobalStyle>
    </ChakraProvider>
  );
}
export default MyApp;
