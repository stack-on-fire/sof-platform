import { useColorModeValue } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image";
import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
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
                <Stack spacing={4}>
                  <Image
                    borderRadius={10}
                    boxShadow="base"
                    src={course.cover?.url}
                    layout="fixed"
                  />
                  <Stack>
                    <Box mb={2}>
                      <Heading
                        color={useColorModeValue("gray.700", "gray.100")}
                        fontSize="2xl"
                        mb={1}
                        _groupHover={{ color: "red.400" }}
                      >
                        {course.title}
                      </Heading>
                      <Box color={useColorModeValue("gray.400", "gray.500")}>
                        {course.description}
                      </Box>
                    </Box>
                    <HStack>
                      <Image
                        borderRadius={20}
                        w={10}
                        h={10}
                        src={course.author.profileImage.url}
                      />
                      <Text fontSize="xs" fontWeight="medium">
                        {course.author.name}
                      </Text>
                    </HStack>
                  </Stack>
                </Stack>
              </Link>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Courses;
