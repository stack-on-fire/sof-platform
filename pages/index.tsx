import React from "react";
import { Box, Link as ChakraLink } from "@chakra-ui/layout";
import { Hero, Newsletter, Features, Footer, Pricing } from "components";
import { getAllPosts } from "lib/api";
import { GetStaticProps } from "next";
import { PostType } from "types/post";

import Layout from "components/layout";

import {
  Heading,
  HStack,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { BlogCard } from "components/blog-card";
import Link from "next/link";
import { WhoIAm } from "components/who-i-am";

type IndexProps = {
  posts: PostType[];
};

const Index = ({ posts }: IndexProps): JSX.Element => {
  const colorMode = useColorModeValue("dark", "light");
  return (
    <Layout px={0}>
      <Hero />
      <WhoIAm />
      <Box mt={8} mb={4} px={[8, 4]}>
        <HStack>
          <Heading>Featured articles</Heading>
          <Link href="/posts">
            <ChakraLink color={useColorModeValue("gray.600", "gray.400")}>
              All articles
            </ChakraLink>
          </Link>
        </HStack>
        <SimpleGrid
          px={4}
          mt={8}
          columns={{ base: 1, md: 2 }}
          spacing="4"
          mb="10"
        >
          {posts.map((post) => {
            return (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                content={post.content}
                media={`https://sof-og-image.vercel.app/${post.title}.png?theme=${colorMode}&md=1&fontSize=100px&images=https://www.stackonfire.dev/logo.svg`}
                title={post.title}
                description={post.description}
              />
            );
          })}
        </SimpleGrid>
      </Box>
      <Features />
      {/* <Pricing /> */}
      <Box px={6}>
        <Newsletter />
      </Box>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts([
    "date",
    "description",
    "slug",
    "title",
    "image",
    "content",
    "draft",
  ]);

  return {
    props: {
      posts: posts.filter((post) => !post.draft).slice(0, 2),
    },
  };
};

export default Index;
