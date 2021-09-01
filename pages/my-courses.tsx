import { Box, SimpleGrid } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import client from "apollo-client";
import { Navbar } from "components";
import EnrolledCourses from "components/enrolled-courses";
import Layout from "components/layout";
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

      {enrolledData && purchasesData && videoData ? (
        <EnrolledCourses
          enrolledCourses={enrolledData}
          purchasedCourses={purchasesData}
          watchedVideos={videoData}
          courses={courses}
        />
      ) : (
        <Box maxW="7xl" mx="auto" px={4} mt={4}>
          <Skeleton height="30px" width={200} mb={4} />
          <SimpleGrid spacing={4}>
            {[null, null, null]?.map(() => {
              return (
                <Skeleton
                  border="1px solid"
                  borderColor="gray.400"
                  borderRadius={8}
                  p={4}
                  height="120px"
                />
              );
            })}
          </SimpleGrid>
        </Box>
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
