import {
  Box,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useSession } from "next-auth/client";
import * as React from "react";
import { HiPencilAlt } from "react-icons/hi";
import { CardContent } from "./card-content";
import { CardWithAvatar } from "./card-with-avatar";
import { UserInfo } from "./user-info";

export const UserCard = ({ name }) => {
  const [session] = useSession();
  return (
    <Box as="section" pt="20" pb="12" position="relative">
      <Box
        position="absolute"
        inset="0"
        height="150"
        bgGradient="linear(to-r, orange.200, yellow.500, pink.300)"
      />
      <CardWithAvatar
        maxW="xl"
        avatarProps={
          {
            // src: "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fHdvbWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            // name,
          }
        }
        action={
          <Button size="sm" leftIcon={<HiPencilAlt />}>
            Edit
          </Button>
        }
      >
        <CardContent>
          <Heading
            textAlign="center"
            size="lg"
            fontWeight="extrabold"
            letterSpacing="tight"
          >
            {name}
          </Heading>
          <Text
            textAlign="center"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Learning @ Stack on Fire 🔥
          </Text>
          {session?.user && (
            <UserInfo
              memberSince={`Joined ${format(
                new Date(session?.user?.createdAt),
                "PP"
              )}`}
            />
          )}
        </CardContent>
      </CardWithAvatar>
    </Box>
  );
};
