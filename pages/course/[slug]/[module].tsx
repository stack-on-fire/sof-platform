import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { Navbar } from "components";
import { Course, Module as ModuleType, Video } from "components/courses/types";
import { fetchAPI } from "lib/api";
import React, { createRef, useEffect, useState } from "react";
import flatten from "lodash/flatten";
import { useRouter } from "next/dist/client/router";
import gql from "graphql-tag";
import client from "apollo-client";
import ReactPlayer from "react-player";
import VisuallyHidden from "@chakra-ui/visually-hidden";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { customFormatDuration } from "utils";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Switch } from "@chakra-ui/switch";
import { useBreakpointValue } from "@chakra-ui/media-query";

type Props = {
  module: ModuleType;
};

const Module = ({ module }) => {
  const [isPlaying, setPlaying] = useState(false);
  const [autoPlay, setAutoplay] = useState(false);
  const [videoDurations, setVideoDurations] = useState([]);
  const [metaLoaded, setMetaLoaded] = useState("");
  const [elRefs, setElRefs] = React.useState([]);
  const arrLength = module.videos.length;
  const [playedVideo, setPlayedVideo] = useState(module.videos[0]);

  useEffect(() => {
    setElRefs((elRefs) =>
      Array(arrLength)
        //@ts-ignore
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [arrLength]);

  useEffect(() => {
    if (elRefs.length > 0) {
      const videoDurations = elRefs.map((ref) => {
        console.log(ref.current.duration);
        return { src: ref.current.src, duration: ref.current.duration };
      });

      setVideoDurations(videoDurations);
    }
  }, [elRefs, metaLoaded]);

  return (
    <Box maxW={1200} m="auto">
      <Navbar />
      <Flex flexGrow={3} direction={["column", "column", "column", "row"]}>
        <Flex
          p={[2, 2, 2, 0]}
          justifyContent={["center", null]}
          position="relative"
          maxH={[null, null, null, 400]}
          width="100%"
        >
          <ReactPlayer
            playing={isPlaying}
            controls={true}
            url={playedVideo.videoFile.url}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                },
              },
            }}
            onEnded={() => {
              const currentlyPlayedIndex = module.videos.findIndex(
                (v) => v.id === playedVideo.id
              );
              const nextVideo = module.videos[currentlyPlayedIndex + 1];
              if (nextVideo && autoPlay) {
                setPlayedVideo(nextVideo);
                setTimeout(() => setPlaying(true), 500);
              }
            }}
          />
        </Flex>
        <Flex
          direction="column"
          maxH={400}
          minWidth={330}
          overflow="scroll"
          marginX="auto"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          mt={useBreakpointValue({
            sm: 4,
            md: 4,
            lg: 0,
          })}
          borderRadius={useBreakpointValue({
            sm: 8,
            md: 8,
            lg: 0,
          })}
          m={[4, 4, 4, 0]}
        >
          <Flex
            p={4}
            position="sticky"
            top="0px"
            backgroundColor={useColorModeValue("white", "gray.800")}
            borderBottom="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.500")}
            justifyContent="space-between"
          >
            <Heading size="md">{module.title}</Heading>
            <FormControl ml={4} maxW={120} display="flex" alignItems="center">
              <FormLabel mb="0" htmlFor="email-alerts">
                Auto-play
              </FormLabel>
              <Switch
                isChecked={autoPlay}
                onChange={() => setAutoplay((autoPlay) => !autoPlay)}
              />
            </FormControl>
          </Flex>
          {module.videos.map((video: Video, index) => {
            const duration = videoDurations.find(
              (v) => v.src === video.videoFile.url
            );
            const humaneReadableDuration = duration?.duration
              ? customFormatDuration({
                  start: 0,
                  end: duration?.duration * 1000,
                })
                  .replace("seconds", "s")
                  .replace("minutes", "m")
              : "";

            const isCurrentVideoPlaying = playedVideo.id === video.id;

            return (
              <HStack
                role="group"
                pl={2}
                py={3}
                backgroundColor={isCurrentVideoPlaying ? "blue.400" : null}
                color={isCurrentVideoPlaying ? "white" : null}
                _hover={{
                  background: "blue.400",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => setPlayedVideo(video)}
              >
                <VisuallyHidden>
                  <video
                    onLoadedMetadata={() => setMetaLoaded(video.slug)}
                    src={video?.videoFile.url}
                    ref={elRefs[index]}
                  />
                </VisuallyHidden>

                <Stack>
                  <HStack mb={-3}>
                    <Text
                      color={useColorModeValue(
                        isCurrentVideoPlaying ? "white" : "gray.400",
                        "gray.300"
                      )}
                    >
                      {index + 1}
                    </Text>
                    <Text fontWeight="bold">{video.title}</Text>
                  </HStack>
                  <Text
                    pl={5}
                    fontSize={14}
                    color={useColorModeValue(
                      isCurrentVideoPlaying ? "white" : "gray.400",
                      "gray.300"
                    )}
                    _groupHover={{
                      color: "white",
                    }}
                  >
                    {humaneReadableDuration}
                  </Text>
                </Stack>
              </HStack>
            );
          })}
        </Flex>
      </Flex>
      <Divider
        my={4}
        display={useBreakpointValue({
          sm: "block",
          md: "block",
          lg: "none",
        })}
      />
      <Box p={4}>
        <Heading>{module.title}</Heading>
        <Text mt={4} mb={16}>
          {module.description}
        </Text>
      </Box>
    </Box>
  );
};

export default Module;

export async function getStaticPaths() {
  const courses = await fetchAPI("/courses");
  const paths = courses.map((course: Course) => {
    return course.modules.map((module) => {
      return { slug: course.slug, module: module.slug };
    });
  });

  const params = flatten(paths).map((path) => {
    return { params: path };
  });

  return {
    paths: params,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const query = gql`
    query Modules($slug: String) {
      modules(where: { slug: $slug }) {
        title
        description
        slug
        videos {
          id
          title
          slug
          duration
          videoFile {
            provider_metadata
            id
            url
          }
        }
      }
    }
  `;

  const { data } = await client.query({
    query,
    variables: {
      slug: params.module,
    },
  });

  return {
    props: { module: data.modules[0] },
  };
}