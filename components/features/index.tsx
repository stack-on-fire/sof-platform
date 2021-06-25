import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { BiDirections, BiHappyBeaming } from "react-icons/bi";
import { FaGraduationCap, FaRegLifeRing } from "react-icons/fa";
import Link from "next/link";
import { Cta } from "./cta";
import { Feature } from "./feature";
import { Testimonial } from "./testimonial";

export const Features = () => {
  return (
    <Box as="section" pb="24">
      <Box bg={useColorModeValue("white", "gray.800")} pt="24" pb="12rem">
        <Box
          maxW={{ base: "xl", md: "7xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
        >
          <Stack
            spacing="10"
            direction={{ base: "column", lg: "row" }}
            align={{ base: "flex-start", lg: "center" }}
            justify="space-between"
          >
            <Heading
              size="xl"
              lineHeight="short"
              fontWeight="extrabold"
              maxW={{ base: "unset", lg: "800px" }}
            >
              Spend time on ideas, not on figuring out how to write
              authentication or payment flows.
            </Heading>
            <Link href="/platform">
              <Cta w={{ base: "full", md: "auto" }}>Get Started</Cta>
            </Link>
          </Stack>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={{ base: "12", md: "8", lg: "2" }}
            mt={{ base: "12", md: "20" }}
          >
            <Feature icon={<BiDirections />} title="Go full stack">
              Learn how to build modern Frontend and Backend apps. Connect the
              dots and get them to work together.
            </Feature>
            <Feature
              icon={<BiHappyBeaming />}
              title="Design with scale in mind"
            >
              Learn how the SaaS apps that are intended to be serving thousands
              of users are built and sold.
            </Feature>
            <Feature icon={<FaGraduationCap />} title="Educate yourself">
              Get up to date with the contemporary application architecture
              principles, learn new technologies. Get your tech skills to brand
              new level.
            </Feature>
            <Feature icon={<FaRegLifeRing />} title="Unleash your creativity">
              Having a toolkit is just the beginning. Mastering it - allows you
              to ship apps fast enough to make a prosperous business out of it.
            </Feature>
          </SimpleGrid>
        </Box>
      </Box>
      <Box mt="-24">
        <Box
          maxW={{ base: "xl", md: "7xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
        >
          <SimpleGrid spacing="14" columns={{ base: 1, lg: 2 }}>
            <Testimonial
              image="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
              name="Alvina Tores"
              role="CEO, Chakra Group"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Testimonial>
            <Testimonial
              image="https://images.unsplash.com/photo-1589729482945-ca6f3a235f7a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
              name="Jessie Jones"
              role="Marketing Manager"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </Testimonial>
            <Testimonial
              image="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
              name="Alvina Tores"
              role="CEO, Chakra Group"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Testimonial>
            <Testimonial
              image="https://images.unsplash.com/photo-1589729482945-ca6f3a235f7a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
              name="Jessie Jones"
              role="Marketing Manager"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </Testimonial>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};
