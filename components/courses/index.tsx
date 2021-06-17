import { useColorModeValue } from "@chakra-ui/color-mode";
import { Img } from "@chakra-ui/react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout";
import Link from "next/link";

import React from "react";
import { Course } from "./types";

const Courses = ({ courses }) => {
  return (
    <Box p={4}>
      <SimpleGrid columns={[1, 2, 2, 3]} spacing={4}>
        {courses.map((course: Course) => {
          return (
            <Box
              key={String(course.id)}
              p={4}
              boxShadow={useColorModeValue("md", "xl")}
              _hover={{ boxShadow: "lg", cursor: "pointer" }}
              transition="0.3s all"
              role="group"
            >
              <Link as={`/course/${course.slug}`} href="/course/[slug]">
                <Flex direction="column" height="100%">
                  <Img
                    borderRadius={10}
                    boxShadow="base"
                    src={course.cover?.url}
                    layout="fixed"
                  />

                  <Heading
                    mt={4}
                    color={useColorModeValue("gray.700", "gray.100")}
                    fontSize="2xl"
                    mb={2}
                    _groupHover={{ color: "red.400" }}
                  >
                    {course.title}
                  </Heading>
                  <Box color={useColorModeValue("gray.400", "gray.500")} mb={2}>
                    {course.description}
                  </Box>
                  <HStack marginTop="auto">
                    <Img
                      borderRadius={20}
                      w={10}
                      h={10}
                      src={course.author.profileImage.url}
                    />
                    <Text fontSize="xs" fontWeight="medium">
                      {course.author.name}
                    </Text>
                  </HStack>
                </Flex>
              </Link>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Courses;
