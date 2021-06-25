import { Box } from "@chakra-ui/layout";
import client from "apollo-client";
import { Navbar } from "components";
import Courses from "components/courses";
import Layout from "components/layout";
import gql from "graphql-tag";
import React from "react";

const Platform = ({ courses }) => {
  return (
    <Layout px={0}>
      <Courses courses={courses} />
    </Layout>
  );
};

export default Platform;

export async function getStaticProps() {
  const query = gql`
    query Courses {
      courses {
        id
        slug
        cover {
          url
        }
        author {
          name
          profileImage {
            url
          }
        }
        title
        description
        updated_at
        prerequisites
        modules {
          title
          description
          slug
          videos {
            id
            title
            duration
            videoFile {
              provider_metadata
              id
              url
            }
          }
        }
      }
    }
  `;
  const { data } = await client.query({
    query,
  });

  const courses = data?.courses;

  return {
    props: {
      courses,
    },
  };
}
