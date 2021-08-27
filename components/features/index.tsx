import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Newsletter } from "components/newsletter";
import * as React from "react";
import { MdDeveloperBoard } from "react-icons/md";
import { FiTrendingUp } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { Cta } from "./cta";
import { Feature } from "./feature";
import { Testimonial } from "./testimonial";
import { GiTreeGrowth } from "react-icons/gi";

export const Features = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Cta onClick={onOpen} w={{ base: "full", md: "auto" }}>
              Get Started
            </Cta>
          </Stack>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={{ base: "12", md: "8", lg: "2" }}
            mt={{ base: "12", md: "20" }}
          >
            <Feature icon={<MdDeveloperBoard />} title="Go full stack">
              Learn how to build modern Frontend and Backend apps. Connect the
              dots and get them to work together.
            </Feature>
            <Feature icon={<FiTrendingUp />} title="Design with scale in mind">
              Learn how the SaaS apps that are intended to be serving thousands
              of users are built and sold.
            </Feature>
            <Feature icon={<FaGraduationCap />} title="Educate yourself">
              Get up to date with the contemporary application architecture
              principles, learn new technologies. Get your tech skills to brand
              new level.
            </Feature>
            <Feature icon={<GiTreeGrowth />} title="Unleash your creativity">
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
              image="https://avatars.githubusercontent.com/u/8336893?v=4"
              name="Chris Kalmar"
              role="Software Architect"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Testimonial>
            <Testimonial
              image="https://avatars.githubusercontent.com/u/1021430?v=4"
              name="Dominik Dorfmeister"
              role="Tech lead, React Query core team"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </Testimonial>
            <Testimonial
              image="https://unavatar.vercel.app/twitter/vponamariov"
              name="Viktor"
              role="Design & Code expert"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Testimonial>
            <Testimonial
              image="https://unavatar.vercel.app/twitter/VladPasca5"
              name="Vlad Pasca"
              role=""
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </Testimonial>
          </SimpleGrid>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Newsletter
              noShadow
              reducedFontSize
              title="We are busy preparing the course. Subscribe to get updates and exclusive pre-launch discounts."
              cta="Subscribe"
              ctaDone="You are subscribed 🎉"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
