import Document, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({ config } as any);

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
          <script src="https://cdn.paddle.com/paddle/paddle.js" />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `Paddle.Environment.set('sandbox');Paddle.Setup({ vendor: 2338 });`,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
