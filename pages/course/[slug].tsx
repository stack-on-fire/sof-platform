import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Button, IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import {
  AspectRatio,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/layout";
import client from "apollo-client";
import { Navbar } from "components";
import { Course } from "components/courses/types";
import { format } from "date-fns";
import gql from "graphql-tag";
import { fetchAPI } from "lib/api";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { FaPhotoVideo } from "react-icons/fa";

type Props = {
  course: Course;
};

const CourseDetail = ({ course }: Props) => {
  const modules = course.modules;
  const router = useRouter();
  return (
    <Box>
      <Navbar />
      <IconButton
        onClick={() => router.back()}
        borderRadius={100}
        m={4}
        aria-label="Back"
        size="md"
        icon={<ArrowBackIcon />}
      />
      <Heading textAlign="center" mb={2}>
        {course.title}
      </Heading>
      <Center mb={2}>
        <Image
          borderRadius={20}
          w={10}
          h={10}
          src={course.author.profileImage.url}
        />
      </Center>
      <Text
        color={useColorModeValue("gray.400", "gray.500")}
        textAlign="center"
        mb={8}
      >
        Last updated on {format(new Date(course.updated_at), "PP")}
      </Text>

      <Box mt={4}>
        <Center mb={4} p={4}>
          <AspectRatio flex="1 1 auto" ratio={4 / 3} maxW="400px">
            <Image borderRadius={8} src={course.cover.url} objectFit="cover" />
          </AspectRatio>
        </Center>
        <Center mb={4}>
          <Text
            maxW={400}
            color={useColorModeValue("gray.500", "gray.400")}
            mb={4}
            textAlign="center"
          >
            {course.description}
          </Text>
        </Center>

        <Stack>
          <Heading textAlign="center" fontSize="2xl">
            Modules
          </Heading>
          <Box p={4}>
            <Accordion allowMultiple>
              {modules.map((module) => {
                return (
                  <AccordionItem key={module.id}>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <Flex justifyContent="space-between">
                          <HStack>
                            <Heading size="md">{module.title}</Heading>
                            <Text
                              color={useColorModeValue("gray.700", "gray.500")}
                            >
                              {module.videos.length} videos
                            </Text>
                          </HStack>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            Start watching
                          </Button>
                        </Flex>
                      </Box>
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Heading size="sm" mb={2}>
                        What you'll learn
                      </Heading>
                      <Text
                        pl={4}
                        color={useColorModeValue("gray.700", "gray.500")}
                      >
                        {module.description}
                      </Text>
                      <Divider my={2} />
                      <Heading size="sm" mb={2}>
                        What is included in the module
                      </Heading>

                      <List spacing={3}>
                        {module.videos.map((video) => {
                          console.log(video);
                          return (
                            <ListItem pl={4} display="flex" alignItems="center">
                              <ListIcon
                                color={useColorModeValue(
                                  "gray.700",
                                  "gray.300"
                                )}
                                as={FaPhotoVideo}
                              />
                              <Text
                                color={useColorModeValue(
                                  "gray.700",
                                  "gray.500"
                                )}
                              >
                                {video.title}
                              </Text>
                            </ListItem>
                          );
                        })}
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default CourseDetail;

export async function getStaticPaths() {
  const courses = await fetchAPI("/courses");

  return {
    paths: courses.map((course: Course) => ({
      params: {
        slug: course.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const query = gql`
    query Courses($slug: String) {
      courses(where: { slug: $slug }) {
        id
        cover {
          url
        }
        author {
          profileImage {
            url
          }
        }
        title
        description
        updated_at
        modules {
          title
          description
          slug
          videos {
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
    variables: {
      slug: params.slug,
    },
  });

  return {
    props: { course: data.courses[0] },
  };
}
