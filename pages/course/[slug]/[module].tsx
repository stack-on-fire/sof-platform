import { Box, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/layout";
import { Navbar } from "components";
import { Course, Module as ModuleType, Video } from "components/courses/types";
import { fetchAPI } from "lib/api";
import React, { createRef, useEffect, useState } from "react";
import flatten from "lodash/flatten";
import { useRouter } from "next/dist/client/router";
import { IconButton } from "@chakra-ui/button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import gql from "graphql-tag";
import client from "apollo-client";
import ReactPlayer from "react-player";
import VisuallyHidden from "@chakra-ui/visually-hidden";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { customFormatDuration } from "utils";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Switch } from "@chakra-ui/switch";

type Props = {
  module: ModuleType;
};

const Module = ({ module }) => {
  const router = useRouter();
  const [isPlaying, setPlaying] = useState(false);
  const [autoPlay, setAutoplay] = useState(false);
  const [videoDurations, setVideoDurations] = useState([]);
  const [metaLoaded, setMetaLoaded] = useState("");
  const [elRefs, setElRefs] = React.useState([]);
  const arrLength = module.videos.length;
  const [playedVideoUrl, setPlayedVideoUrl] = useState(
    module.videos[0].videoFile.url
  );

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
    <Box>
      <Navbar />
      <IconButton
        onClick={() => router.back()}
        borderRadius={100}
        ml={4}
        mt={4}
        aria-label="Back"
        size="md"
        icon={<ArrowBackIcon />}
      />
      <Heading mb={8} textAlign="center">
        {module.title}
      </Heading>

      <Flex>
        <Box>
          <ReactPlayer
            playing={isPlaying}
            controls={true}
            url={playedVideoUrl}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                },
              },
            }}
            onEnded={() => {
              const currentlyPlayedIndex = module.videos.findIndex(
                (v) => v.videoFile.url === playedVideoUrl
              );
              const nextVideo = module.videos[currentlyPlayedIndex + 1];
              if (nextVideo && autoPlay) {
                setPlayedVideoUrl(nextVideo.videoFile.url);
                setTimeout(() => setPlaying(true), 500);
              }
            }}
          />
        </Box>
        <Box
          flexGrow={1}
          border="1px solid"
          borderColor={useColorModeValue("gray.400", "gray.500")}
        >
          <Box m={2} display="flex">
            <FormControl
              justifyContent="flex-end"
              display="flex"
              alignItems="center"
            >
              <FormLabel htmlFor="email-alerts" mb="0">
                Auto-play
              </FormLabel>
              <Switch
                isChecked={autoPlay}
                onChange={() => setAutoplay((autoPlay) => !autoPlay)}
              />
            </FormControl>
          </Box>
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

            return (
              <HStack
                role="group"
                pl={2}
                py={3}
                backgroundColor={
                  playedVideoUrl === video.videoFile.url ? "blue.400" : null
                }
                color={playedVideoUrl === video.videoFile.url ? "white" : null}
                _hover={{
                  background: "blue.400",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => setPlayedVideoUrl(video.videoFile.url)}
              >
                <VisuallyHidden>
                  <video
                    onLoadedMetadata={() => setMetaLoaded(video.slug)}
                    src={video.videoFile.url}
                    ref={elRefs[index]}
                  />
                </VisuallyHidden>

                <Stack>
                  <HStack mb={-3}>
                    <Text color={useColorModeValue("gray.400", "gray.300")}>
                      {index + 1}
                    </Text>
                    <Text fontWeight="bold">{video.title}</Text>
                  </HStack>
                  <Text
                    pl={5}
                    fontSize={14}
                    color={useColorModeValue("gray.400", "gray.300")}
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
        </Box>
      </Flex>
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
