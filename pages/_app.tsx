import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Toaster } from "react-hot-toast";
import { Provider } from "next-auth/client";
import NextNprogress from "nextjs-progressbar";
import { FireFlags } from "react-fire-flags";

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
            <FireFlags
              projectId={process.env.NEXT_PUBLIC_FIRE_FLAGS_PROJECT_ID}
            >
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
            </FireFlags>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
export default MyApp;
