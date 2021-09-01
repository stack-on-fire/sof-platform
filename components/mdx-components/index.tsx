import {
  Box,
  Code,
  Heading,
  Link,
  Text,
  Divider,
  useColorMode,
  useColorModeValue,
  Icon,
  theme,
} from "@chakra-ui/react";

import styled from "@emotion/styled";
import NextLink from "next/link";
import { AiOutlineFire } from "react-icons/ai";

const CustomLink = (props) => {
  const { colorMode } = useColorMode();
  const color = {
    light: "hsl(208, 99%, 44%)",
    dark: "hsl(208, 95%, 68%)",
  };

  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <Link color={color[colorMode]} {...props} />
      </NextLink>
    );
  }

  return <Link color={color[colorMode]} isExternal {...props} />;
};

const Quote = (props) => {
  const { colorMode } = useColorMode();
  const bgColor = {
    light: "blue.50",
    dark: "gray.700",
  };
  return (
    <Box py={8}>
      <Box pos="relative">
        <Box
          position="absolute"
          top="-30px"
          left="-20px"
          backgroundColor={useColorModeValue("white", "gray.800")}
          p={2}
          borderRadius={40}
        >
          <Icon as={AiOutlineFire} w={8} h={8} color="pink.400" />
        </Box>
        <Box
          p={4}
          borderLeft="4px"
          borderColor="pink.300"
          mt={4}
          w="98%"
          bg={bgColor[colorMode]}
          css={{
            "> *:first-of-type": {
              marginTop: 0,
              marginLeft: 8,
            },
          }}
          {...props}
        />
      </Box>
    </Box>
  );
};

const DocsHeading = (props) => (
  <Heading
    css={{
      scrollMarginTop: "100px",
      scrollSnapMargin: "100px", // Safari
      "&[id]": {
        pointerEvents: "none",
      },
      "&[id]:before": {
        display: "block",
        height: " 6rem",
        marginTop: "-6rem",
        visibility: "hidden",
        content: `""`,
      },
      "&[id]:hover a": { opacity: 1 },
    }}
    {...props}
    mb="1em"
    mt="2em"
  >
    <Box pointerEvents="auto">
      {props.children}
      {props.id && (
        <Box
          aria-label="anchor"
          as="a"
          color="orange.500"
          fontWeight="normal"
          outline="none"
          _focus={{
            opacity: 1,
            boxShadow: "outline",
          }}
          opacity="0"
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </Box>
      )}
    </Box>
  </Heading>
);

const Hr = () => {
  const { colorMode } = useColorMode();
  const borderColor = {
    light: "gray.200",
    dark: "gray.600",
  };

  return <Divider borderColor={borderColor[colorMode]} my={4} w="100%" />;
};

const StyledUl = styled(Box)`
  && {
    list-style: none;
    margin-left: 0;
    padding-left: 1em;
    text-indent: -1em;
    > li {
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;

      &:before {
        font-size: 25px;
        padding-right: 5px;
        content: "➞";
        color: ${theme.colors.pink[400]};
        filter: grayscale(20%);
      }
    }
  }
`;

const StyledOl = styled(Box)`
  && {
    list-style: none;
    counter-reset: item;
    padding-left: 1em;
    text-indent: -0.6em;
    > li {
      counter-increment: item;
      margin-bottom: 5px;
      &:before {
        font-size: 20px;
        font-weight: bold;
        color: ${theme.colors.pink[400]};
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
          "Lucida Sans", Arial, sans-serif;
        margin-right: 10px;
        content: counter(item) ".";
        text-align: center;
        display: inline-block;
      }
    }
  }
`;

const MDXComponents = {
  h1: (props) => <Heading as="h1" size="xl" mb={4} pt={6} {...props} />,
  h2: (props) => (
    <DocsHeading as="h2" size="lg" fontWeight="bold" pt={6} {...props} />
  ),
  h3: (props) => (
    <DocsHeading as="h3" size="md" fontWeight="bold" pt={6} {...props} />
  ),
  h4: (props) => (
    <DocsHeading as="h4" size="sm" fontWeight="bold" pt={6} {...props} />
  ),
  h5: (props) => (
    <DocsHeading as="h5" size="sm" fontWeight="bold" pt={6} {...props} />
  ),
  h6: (props) => (
    <DocsHeading as="h6" size="xs" fontWeight="bold" pt={6} {...props} />
  ),
  inlineCode: (props) => (
    <Code colorScheme="orange" fontSize="0.84em" {...props} />
  ),
  br: (props) => <Box height="24px" {...props} />,
  hr: Hr,
  a: CustomLink,
  p: (props) => (
    <Text fontSize="lg" as="p" mt={0} lineHeight="tall" {...props} />
  ),
  ul: (props) => <StyledUl as="ul" py={4} pl={4} ml={2} {...props} />,
  ol: (props) => <StyledOl as="ol" py={4} pl={4} ml={2} {...props} />,
  li: (props) => <Box fontSize={18} as="li" pb={1} {...props} />,
  blockquote: Quote,
};

export default MDXComponents;
