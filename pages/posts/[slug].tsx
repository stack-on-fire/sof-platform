import { format, parseISO } from "date-fns";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import React from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import mdxPrism from "mdx-prism";
import Head from "next/head";
import Layout from "components/layout";
import { MetaProps } from "../../types/layout";
import { PostType } from "types/post";
import { postFilePaths, POSTS_PATH } from "utils";
import {
  Box,
  Heading,
  HStack,
  Skeleton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import MDXComponents from "components/mdx-components";
import { Global, css } from "@emotion/react";
import { prismDarkTheme, prismLightTheme } from "styles/prism";
import { useEffect } from "react";
import { BsClockFill, BsEyeFill } from "react-icons/bs";
import useSWR from "swr";
import readingTime from "reading-time";
import MdxNewsletter from "components/newsletter/mdx-newsletter";

const PrismStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Global
        styles={css`
          ${colorMode === "light" ? prismLightTheme : prismDarkTheme};
          html {
            min-width: 356px;
            scroll-behavior: smooth;
            p,
            li {
              font-family: "Open Sans";
            }
          }
        `}
      />
      {children}
    </>
  );
};

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Head,
  Image,
  Link,
  MdxNewsletter,
  ...MDXComponents,
};

type PostPageProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: PostType;
  slug: string;
  readingTime: String;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error("Error");
  }
  const response = await res.json();
  return response;
};

const PostPage = ({
  source,
  frontMatter,
  slug,
  readingTime,
}: PostPageProps): JSX.Element => {
  const customMeta: MetaProps = {
    title: `${frontMatter.title} - Stack on Fire 🔥`,
    description: frontMatter.description,
    image: `https://sof-og-image.vercel.app/${frontMatter.title}.png?theme=dark&md=1&fontSize=100px&images=https://www.stackonfire.dev/logo.svg`,
    date: frontMatter.date,
    type: "article",
  };
  const colorMode = useColorModeValue("dark", "light");

  const { data: hitsData, error: hitsError } = useSWR(
    [`/api/getHitsForBlogposts/${slug}`],
    fetcher
  );

  const hits = hitsData?.result[0][slug];

  useEffect(() => {
    async function registerHit() {
      const result = await fetch("/api/bumpUpBlogpostHit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: slug }),
      });
    }
    registerHit();
  }, []);
  return (
    <Layout customMeta={customMeta}>
      <article>
        <Heading mt={8} mb={2}>
          {frontMatter.title}
        </Heading>
        <HStack alignItems="center" mb={4}>
          <Text color={useColorModeValue("gray.500", "gray.400")}>
            {format(parseISO(frontMatter.date), "MMMM dd, yyyy")}
          </Text>
          <Text color={useColorModeValue("gray.300", "gray.600")}>//</Text>
          <HStack color={useColorModeValue("gray.500", "gray.400")}>
            <HStack spacing={0}>
              <Box as={BsEyeFill} display="inline-block" me="2" opacity={0.4} />
              {hits !== undefined ? (
                <Text>{hits}</Text>
              ) : (
                <Skeleton height={3} width={4} />
              )}
            </HStack>
            <HStack
              spacing={0}
              color={useColorModeValue("gray.500", "gray.400")}
            >
              <Box
                as={BsClockFill}
                display="inline-block"
                me="2"
                opacity={0.4}
              />
              <Text>{readingTime}</Text>
            </HStack>
          </HStack>
        </HStack>
        <Image
          layout="responsive"
          height={720}
          width={1240}
          src={`https://sof-og-image.vercel.app/${frontMatter.title}.png?theme=${colorMode}&md=1&fontSize=100px&images=https://www.stackonfire.dev/logo.svg`}
        />
        <Box maxWidth="700px" mx="auto">
          <PrismStyle>
            <MDXRemote {...source} components={components} />
          </PrismStyle>
        </Box>
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [require("remark-code-titles")],
      rehypePlugins: [mdxPrism, rehypeSlug, rehypeAutolinkHeadings],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      slug: params.slug,
      readingTime: readingTime(content).text,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
