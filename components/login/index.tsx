import React from "react";
import {
  Box,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { Logo } from "components/logo";
import { LoginForm } from "./login-form";
import { UnderlineLink } from "./underline-link";

type Props = {
  variant: "signin" | "signup" | "forgot-password";
};

export const Login = ({ variant }: Props) => {
  return (
    <Box
      overflowY="auto"
      flex="1"
      py={{ base: "10", md: "16" }}
      px={{ base: "6", md: "10" }}
    >
      <Stack spacing={4} maxW="sm" mx="auto">
        <Center>
          <Logo />
        </Center>
        <Box textAlign="center" mb={{ base: "10", md: "16" }}>
          <Stack>
            <Heading
              as="h1"
              size="xl"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              {variant === "signin" && "Sign in to your account"}
              {variant === "signup" && "Create a new account"}
              {variant === "forgot-password" && "Recover your account"}
            </Heading>
            <Heading
              color={useColorModeValue("gray.500", "gray.400")}
              size="md"
            >
              We will send you a magic link
            </Heading>
          </Stack>
          {/* {variant !== "signup" && (
            <Text
              mt="3"
              color={mode("gray.600", "gray.400")}
              fontWeight="medium"
            >
              Need an account?{" "}
              <Link href="/signup">
                <UnderlineLink>Sign up for free</UnderlineLink>
              </Link>
            </Text>
          )} */}
        </Box>
        <LoginForm variant={variant} />
      </Stack>
    </Box>
  );
};
