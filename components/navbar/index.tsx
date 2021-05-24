import {
  Box,
  Flex,
  HStack,
  Stack,
  Switch,
  useColorMode,
  useColorModeValue as mode,
  VisuallyHidden,
} from "@chakra-ui/react";
import * as React from "react";

import { Logo } from "components/logo";
export const Navbar = () => {
  return (
    <Box>
      <Box as="header" bg={mode("white", "gray.800")} borderBottomWidth="1px">
        <Box maxW="7xl" mx="auto" py="4" px={{ base: "6", md: "8" }}>
          <Flex as="nav" justify="space-between">
            <HStack
              spacing="8"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box as="a" href="#" rel="home">
                <VisuallyHidden>Stack on fire</VisuallyHidden>
                <Logo h="6" />
              </Box>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
