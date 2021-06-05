import { Box } from "@chakra-ui/layout";
import client from "apollo-client";
import { Navbar } from "components";
import Courses from "components/courses";
import { Course, Module, Video } from "components/courses/types";
import gql from "graphql-tag";
import React from "react";
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";

const Platform = ({ courses }) => {
  return (
    <Box>
      <Navbar />
      <Courses courses={courses} />
    </Box>
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
