import { Box } from "@chakra-ui/layout";
import client from "apollo-client";
import { Navbar } from "components";
import EnrolledCourses from "components/enrolled-courses";
import gql from "graphql-tag";
import React from "react";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error("Error");
  }
  const response = await res.json();
  return response;
};

const Platform = ({ courses }) => {
  const {
    data: enrolledData,
    error: coursesError,
    mutate: coursesMutate,
  } = useSWR([`/api/courses`], fetcher);
  const { data: purchasesData, error: purchasesError } = useSWR(
    [`/api/purchases`],
    fetcher
  );
  const { data: videoData, error: videoError } = useSWR(
    [`/api/videos`],
    fetcher
  );

  return (
    <Box>
      <Navbar />
      {enrolledData && purchasesData && videoData && (
        <EnrolledCourses
          enrolledCourses={enrolledData}
          purchasedCourses={purchasesData}
          watchedVideos={videoData}
          courses={courses}
        />
      )}
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
