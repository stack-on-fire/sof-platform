import type { AppProps } from "next/app";
import splitbee from "@splitbee/web";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Toaster } from "react-hot-toast";
import { Provider } from "next-auth/client";
import { useEffect } from "react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect((): void => {
    splitbee.init();
  }, []);

  return (
    <ChakraProvider>
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
    </ChakraProvider>
  );
}
export default MyApp;
