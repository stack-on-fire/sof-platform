import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Toaster } from "react-hot-toast";
import { Provider } from "next-auth/client";
import { useEffect } from "react";
import NextNprogress from "nextjs-progressbar";

if (process.env.NEXT_PUBLIC_ENV === "test") {
  require("mocks");
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider session={pageProps.session}>
            <NextNprogress
              color="#FF8826"
              startPosition={0.3}
              stopDelayMs={200}
              height={2}
              showOnShallow={true}
              options={{ showSpinner: false }}
            />
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
