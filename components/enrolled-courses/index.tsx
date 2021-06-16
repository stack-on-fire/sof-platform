import { Button } from "@chakra-ui/button";
import { Badge, Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { uniqBy } from "lodash";
import { useRouter } from "next/dist/client/router";

import React from "react";

const EnrolledCourses = ({
  courses,
  enrolledCourses,
  purchasedCourses,
  watchedVideos,
}) => {
  const enrolments = enrolledCourses.enrolmentsByUser;
  const watched = watchedVideos.watchedVideosByUser;
  const router = useRouter();
  return (
    <Box pl={8} pt={4}>
      <Heading mb={4}>My courses</Heading>
      <SimpleGrid columns={4} spacing={4}>
        {enrolments?.map((enrolment) => {
          const course = courses.find(
            (course) => Number(course.id) === enrolment.strapiCourseId
          );

          const isCoursePurchased = purchasedCourses.purchasesByUser.some(
            (purchasedCourse) =>
              purchasedCourse.strapiCourseId === Number(course.id)
          );
          const courseVideos = course.modules.reduce(
            (acc, cur) => [...acc, ...cur.videos],
            []
          );

          const uniqWatched = uniqBy(watched, "strapiVideoId");
          const uniqAllVideos = uniqBy(courseVideos, "id");
          const completePercentage = uniqAllVideos.length / uniqWatched.length;

          return (
            <Box
              border="1px solid"
              borderColor="gray.400"
              borderRadius={8}
              p={4}
            >
              <Heading size="sm" isTruncated>
                {course.title}
              </Heading>
              <Box mb={2} minH="25px">
                {isCoursePurchased && (
                  <Badge colorScheme="green">Purchased</Badge>
                )}
              </Box>
              <Progress
                mb={1}
                colorScheme="orange"
                size="sm"
                min={0}
                max={1}
                borderRadius={4}
                value={completePercentage}
              />
              <Text fontSize={14} color="gray" mb={2}>
                {uniqWatched.length}/{uniqAllVideos.length} videos
              </Text>
              <Button
                onClick={() => router.push(`/course/${course.slug}`)}
                w="full"
                size="sm"
              >
                Watch
              </Button>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default EnrolledCourses;
