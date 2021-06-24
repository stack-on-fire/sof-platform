import {
  Box,
  Flex,
  Heading,
  HStack,
  Img,
  LinkBox,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { BsClockFill } from "react-icons/bs";
import Link from "next/link";
import readingTime from "reading-time";

interface BlogProps {
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

export const BlogCard = (props: BlogProps) => {
  const { title, description, media, author, slug, category, content } = props;

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
        >
          <Flex direction="column">
            <Img height="60" objectFit="cover" alt={title} src={media} />
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
              <Heading as="h3" size="sm" mb="2" lineHeight="base">
                {title}
              </Heading>
              <Text noOfLines={2} mb="8" color={mode("gray.600", "gray.400")}>
                {description}
              </Text>
              <Flex
                align="baseline"
                justify="space-between"
                fontSize="sm"
                color={mode("gray.600", "gray.400")}
              >
                <HStack spacing={0}>
                  <Box
                    as={BsClockFill}
                    display="inline-block"
                    me="2"
                    opacity={0.4}
                  />
                  <Text>{readingTime(content).text}</Text>
                </HStack>
              </Flex>
            </Flex>
          </Flex>
        </LinkBox>
      </Box>
    </Link>
  );
};
