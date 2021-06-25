import React from "react";
import { Box, Link as ChakraLink } from "@chakra-ui/layout";
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
      <Box mt={8} mb={4} px={[8, 4]} minH="100vh">
        <HStack>
          <Heading>All articles</Heading>
        </HStack>
        <SimpleGrid
          mt={8}
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing="4"
          mb="10"
        >
          {posts.map((post) => {
            return (
              <BlogCard
                hideCover
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
  ]);

  return {
    props: { posts },
  };
};

export default Index;
