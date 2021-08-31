import { Box, Stack, Text, useColorModeValue as mode } from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";

export const WhoIAm = () => (
  <Box
    bg={mode("gray.50", "gray.800")}
    as="section"
    py={{ base: "12", md: "24" }}
  >
    <Box maxW={{ base: "xl", md: "7xl" }} mx="auto" px={{ base: "6", md: "8" }}>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: "12", xl: "20" }}
        align="center"
      >
        <Box
          maxW={["200px", "300px", "350px"]}
          flex="1"
          h={{ base: "240px", md: "400px" }}
          flexShrink={0}
        >
          <Image width={1000} height={1000} src="/images/profile-pic.jpg" />
        </Box>
        <Box flex="1">
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight={{ base: "bold", md: "extrabold" }}
            lineHeight="short"
            align={{ base: "center", md: "start" }}
          >
            Hey! My name is Dimitri and I want to teach you the best opinionated
            ways of developing complex web projects. You take that knowledge and
            use it to achieve your dreams!
          </Text>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing="5"
            mt="6"
            align="center"
            textAlign={{ base: "center", md: "start" }}
          >
            <Box>
              <Text fontWeight="extrabold">Dimitri Ivashchuk</Text>
              <Text fontSize="sm">Team lead. Indie Hacker. Educator.</Text>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  </Box>
);
