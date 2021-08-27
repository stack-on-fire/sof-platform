import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
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
import { motion } from "framer-motion";
import * as React from "react";
import CurvedStack from "./curved-stack";

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.stackonfire.dev";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { position: "relative", opacity: 0, top: -5 },
  show: { position: "relative", opacity: 1, top: 0 },
};
const itemReversed = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const Hero = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Box
        as="section"
        bg={useColorModeValue("white", "gray.800")}
        color="white"
        pt="7.5rem"
      >
        <Box
          maxW={{ base: "xl", md: "7xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
          height={{ base: null, md: "calc(100vh - 200px)" }}
        >
          <Box textAlign="center">
            <motion.div
              variants={container as any}
              initial="hidden"
              animate="show"
            >
              <motion.div transition={{ duration: 0.6 }} variants={item as any}>
                <Heading
                  as="h1"
                  size="4xl"
                  fontWeight="extrabold"
                  maxW="48rem"
                  mx="auto"
                  lineHeight="1.2"
                  letterSpacing="tight"
                  bgGradient="linear(to-r, #f12711,#f5af19)"
                  bgClip="text"
                >
                  Time to build that SaaS finally
                </Heading>
              </motion.div>
              <motion.div transition={{ duration: 0.6 }} variants={item as any}>
                <Text
                  fontSize="2xl"
                  mt="4"
                  maxW="xl"
                  mx="auto"
                  color="gray.400"
                >
                  Learn the best toolkit in JavaScript/TypeScript ecosystem with
                  fullstack tutorials on example of real production grade
                  applications. Start charging money for them.
                </Text>
              </motion.div>
              <motion.div
                transition={{ duration: 0.8 }}
                variants={itemReversed}
              >
                <Stack
                  justify="center"
                  direction={{ base: "column", md: "row" }}
                  mt="10"
                  mb="20"
                  spacing="4"
                >
                  <Button
                    size="lg"
                    color="orange"
                    onClick={() => {
                      onOpen();
                    }}
                  >
                    Get started for free
                  </Button>
                </Stack>
              </motion.div>
            </motion.div>
          </Box>
          <Box position="relative" top="-50px">
            <CurvedStack />
          </Box>
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
              title="We are busy preparing the courses. Subscribe to get updates and exclusive pre-launch discounts."
              cta="Subscribe"
              ctaDone="You are subscribed 🎉"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
