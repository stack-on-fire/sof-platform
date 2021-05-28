import {
  Box,
  Button,
  Text,
  HStack,
  useColorModeValue as mode,
  VisuallyHidden,
  IconButton,
} from "@chakra-ui/react";

import Link from "next/link";
import * as React from "react";

import { Logo } from "components/logo";
import { signOut, useSession } from "next-auth/client";
import { HiOutlineLogout } from "react-icons/hi";
export const Navbar = () => {
  const [session, loading] = useSession();

  if (loading) {
    return null;
  }

  return (
    <Box as="header" bg={mode("white", "gray.800")} borderBottomWidth="1px">
      <Box maxW="7xl" mx="auto" py="4" px={{ base: "6", md: "8" }}>
        <HStack spacing="8" justifyContent="space-between" alignItems="center">
          <Box as="a" href="#" rel="home">
            <VisuallyHidden>Stack on fire</VisuallyHidden>
            <Logo h="6" />
          </Box>
          {session ? (
            <HStack>
              <Text>{session.user.email}</Text>
              <IconButton
                variant="ghost"
                aria-label="Sign out"
                icon={<HiOutlineLogout />}
                onClick={() => signOut()}
              />
            </HStack>
          ) : (
            <Link href="/signin">
              <Button>Sign in</Button>
            </Link>
          )}
        </HStack>
      </Box>
    </Box>
  );
};
