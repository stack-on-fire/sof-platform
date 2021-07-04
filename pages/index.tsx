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

type IndexProps = {
  posts: PostType[];
};

const Index = ({ posts }: IndexProps): JSX.Element => {
  return (
    <Layout px={0}>
      <Hero />
      <Box mt={8} mb={4} px={[8, 4]}>
        <HStack>
          <Heading>Featured articles</Heading>
          <Link href="/posts">
            <ChakraLink color={useColorModeValue("gray.600", "gray.400")}>
              All articles
            </ChakraLink>
          </Link>
        </HStack>
        <SimpleGrid mt={8} columns={{ base: 1, md: 2 }} spacing="4" mb="10">
          {posts.map((post) => {
            return (
              <BlogCard
                slug={post.slug}
                content={post.content}
                media={post.image}
                title={post.title}
                description={post.description}
              />
            );
          })}
        </SimpleGrid>
      </Box>
      <Features />
      {/* <Pricing /> */}
      <Newsletter />
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
    "isTestPost",
  ]);

  return {
    props: {
      posts: posts
        .filter((post) =>
          process.env.NODE_ENV === "development" ? post : !!post.isTestPost
        )
        .slice(0, 2),
    },
  };
};

export default Index;
