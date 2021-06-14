import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Button, IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Head from "next/head";
import {
  ArrowBackIcon,
  CheckIcon,
  ChevronDownIcon,
  UnlockIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
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
import { GiWhiteBook } from "react-icons/gi";
import { FaPhotoVideo } from "react-icons/fa";
import useSWR from "swr";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/tag";
import { useSession } from "next-auth/client";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error("Error");
  }
  const response = await res.json();
  return response;
};

type Props = {
  course: Course;
};

const CourseDetail = ({ course }: Props) => {
  const modules = course.modules;
  const router = useRouter();
  const [session, loading] = useSession();

  const openCheckout = () => {
    if (!loading) {
      const windowAny: any = window;
      const Paddle = windowAny.Paddle;
      Paddle.Checkout.open({
        product: "12394",
        passthrough: JSON.stringify({
          user: session.id,
          strapiCourseId: course.id,
          affiliation: "Blah",
        }),
      });
    }
  };

  const {
    data: coursesData,
    error: coursesError,
    mutate: coursesMutate,
  } = useSWR([`/api/courses`], fetcher);
  const { data: purchasesData, error: purchasesError } = useSWR(
    [`/api/purchases`],
    fetcher
  );

  const isPurchased = purchasesData?.purchasesByUser.some(
    (purchaseByUser) => purchaseByUser.strapiCourseId === Number(course.id)
  );

  const isEnrolled = coursesData?.enrolmentsByUser.some(
    (courseByUser) => courseByUser.strapiCourseId === Number(course.id)
  );

  return (
    <Box>
      <Head>
        <head>
          <meta key="og:title" name="og:title" content={course.title} />
          <meta
            key="og:description"
            name="og:description"
            content={course.description}
          />
          <meta
            property="og:image"
            //TODO: swap with original forked og-image service
            content={`https://og-image.vercel.app/${course.title}.png`}
          />
        </head>
      </Head>
      <Navbar />
      <Flex
        maxW={1200}
        mt={2}
        px={4}
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
      >
        <IconButton
          onClick={() => router.back()}
          borderRadius={100}
          aria-label="Back"
          size="md"
          icon={<ArrowBackIcon />}
        />
        {isEnrolled ? (
          <Tag size="lg" variant="subtle" colorScheme="orange">
            <TagLeftIcon boxSize="12px" as={CheckIcon} />
            <TagLabel>Enrolled</TagLabel>
          </Tag>
        ) : (
          <Button
            colorScheme="orange"
            size="md"
            onClick={async (e) => {
              e.stopPropagation();
              await fetch("/api/enroll", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ strapiCourseId: course.id }),
              });
              coursesMutate();
            }}
          >
            Enroll to the course
          </Button>
        )}
      </Flex>
      <Heading mb={2} textAlign="center">
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
        <Center mb={8}>
          <Flex alignItems="center" direction={["column", "row"]}>
            <Button
              mr={[0, 4]}
              mb={[2, 0]}
              colorScheme="orange"
              size="lg"
              onClick={async (e) => {
                e.stopPropagation();
                if (isEnrolled) {
                  await fetch("/api/enroll", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ strapiCourseId: course.id }),
                  });
                  coursesMutate();
                }
                router.push(`/course/${course.slug}/${course.modules[0].slug}`);
              }}
            >
              {isEnrolled ? "Start watching" : "Enroll and start watching"}
            </Button>
            <Button
              leftIcon={isPurchased ? <CheckCircleIcon /> : <UnlockIcon />}
              colorScheme={isPurchased ? "green" : "blue"}
              size="lg"
              onClick={openCheckout}
              isDisabled={isPurchased}
            >
              {isPurchased ? "Purchased" : "Unlock all modules"}
            </Button>
          </Flex>
        </Center>
        <Stack maxW={700} m="auto" mb={4}>
          <Heading textAlign="center" fontSize="2xl">
            Modules
          </Heading>
          <Box p={4}>
            <Accordion allowMultiple>
              {modules.map((module, index) => {
                return (
                  <AccordionItem key={index}>
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
                          <ChevronDownIcon />
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
                          return (
                            <ListItem pl={4}>
                              <HStack alignItems="center">
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
                                <Button
                                  size="xs"
                                  onClick={() => {
                                    router.push({
                                      pathname: `/course/${course.slug}/${course.modules[0].slug}`,
                                      query: { videoId: video.id },
                                    });
                                  }}
                                >
                                  Watch
                                </Button>
                              </HStack>
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
        <Stack maxW={700} m="auto">
          <Heading textAlign="center" fontSize="2xl">
            Prerequisites
          </Heading>
          <Box p={4}>
            <Center>
              {!course.prerequisites && (
                <Text fontSize={16}>
                  This course is well fit for beginners 🚀
                </Text>
              )}
              <List spacing={3}>
                {course?.prerequisites?.map((v) => {
                  return (
                    <ListItem>
                      <ListIcon
                        fontSize={20}
                        as={GiWhiteBook}
                        color="orange.500"
                      />
                      {v}
                    </ListItem>
                  );
                })}
              </List>
            </Center>
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
        slug
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
        prerequisites
        modules {
          title
          description
          slug
          videos {
            id
            isIntro
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
