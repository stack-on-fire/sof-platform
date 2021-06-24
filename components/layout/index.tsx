import { Box } from "@chakra-ui/react";
import Head from "components/head";
import { Navbar } from "components/navbar";
import React from "react";
import { MetaProps } from "types/layout";

type LayoutProps = {
  children: React.ReactNode;
  customMeta?: MetaProps;
  px?: number;
};

export const WEBSITE_HOST_URL = "https://nextjs-typescript-mdx-blog.vercel.app";

const Layout = ({ children, customMeta, px }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head customMeta={customMeta} />
      <header>
        <Navbar />
      </header>
      <main>
        <Box maxW="7xl" mx="auto" px={px ?? 8}>
          {children}
        </Box>
      </main>
    </>
  );
};

export default Layout;
