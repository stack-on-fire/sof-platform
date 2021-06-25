import React from "react";
import { Box } from "@chakra-ui/layout";
import { Hero, Newsletter, Features, Footer, Pricing } from "components";
import { getAllPosts } from "lib/api";
import { GetStaticProps } from "next";
import { PostType } from "types/post";

import Layout from "components/layout";

import { Heading, SimpleGrid } from "@chakra-ui/react";
import { BlogCard } from "components/blog-card";

type IndexProps = {
  posts: PostType[];
};

const Index = ({ posts }: IndexProps): JSX.Element => {
  return (
    <Layout px={0}>
      <Hero />
      <Box mt={8} mb={4} px={[8, 4]}>
        <Heading>Featured articles</Heading>
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
  ]);

  return {
    props: { posts },
  };
};

export default Index;
