import {
  Box,
  Flex,
  Heading,
  HStack,
  LinkBox,
  Skeleton,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";
import { BsClockFill, BsEyeFill } from "react-icons/bs";
import Link from "next/link";
import readingTime from "reading-time";
import useSWR from "swr";

interface BlogProps {
  hideCover?: boolean;
  category?: string;
  title: string;
  content: any;
  media: string;
  slug: string;
  description: string;
  author?: {
    name: string;
    href: string;
  };
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error("Error");
  }
  const response = await res.json();
  return response;
};

export const BlogCard = (props: BlogProps) => {
  const { title, description, media, slug, category, content } = props;
  const { data: hitsData, error: hitsError } = useSWR(
    [`/api/getHitsForBlogposts/${slug}`],
    fetcher
  );

  const hits = hitsData?.result[0][slug];

  return (
    <Link as={`/posts/${slug}`} href="/posts/[slug]">
      <Box cursor="pointer">
        <LinkBox
          as="article"
          bg={{ sm: mode("white", "gray.700") }}
          shadow={{ sm: "base" }}
          rounded={{ sm: "md" }}
          overflow="hidden"
          transition="all 0.2s"
          _hover={{ shadow: { sm: "lg" } }}
          role="group"
        >
          <Flex direction="column">
            {!props.hideCover && (
              <Image
                layout="responsive"
                height={720}
                width={1240}
                alt={title}
                src={media}
              />
            )}
            <Flex direction="column" px={{ sm: "6" }} py="5">
              <Text
                casing="uppercase"
                letterSpacing="wider"
                fontSize="xs"
                fontWeight="semibold"
                mb="2"
                color="gray.500"
              >
                {category}
              </Text>
              <Heading
                as="h3"
                size="sm"
                mb="2"
                lineHeight="base"
                _groupHover={{ color: "red.400" }}
              >
                {title}
              </Heading>
              <Text noOfLines={2} mb="8" color={mode("gray.600", "gray.400")}>
                {description}
              </Text>
              <HStack
                alignItems="center"
                fontSize="sm"
                color={mode("gray.600", "gray.400")}
                spacing={4}
              >
                <HStack spacing={0}>
                  <Box
                    as={BsEyeFill}
                    display="inline-block"
                    me="2"
                    opacity={0.4}
                  />

                  {hits !== undefined ? (
                    <Text>{hits}</Text>
                  ) : (
                    <Skeleton height={3} width={4} />
                  )}
                </HStack>
                <HStack spacing={0}>
                  <Box
                    as={BsClockFill}
                    display="inline-block"
                    me="2"
                    opacity={0.4}
                  />
                  <Text>{readingTime(content).text}</Text>
                </HStack>
              </HStack>
            </Flex>
          </Flex>
        </LinkBox>
      </Box>
    </Link>
  );
};
