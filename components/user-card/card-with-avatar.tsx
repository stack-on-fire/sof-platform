import {
  Avatar,
  AvatarProps,
  Box,
  Flex,
  FlexProps,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import BoringAvatar from "boring-avatars";
import { useSession } from "next-auth/client";

interface CardWithAvatarProps extends FlexProps {
  avatarProps: AvatarProps;
  action?: React.ReactNode;
}

export const CardWithAvatar = (props: CardWithAvatarProps) => {
  const { action, avatarProps, children, ...rest } = props;
  const [session] = useSession();
  return (
    <Flex
      position="relative"
      direction="column"
      align={{ sm: "center" }}
      maxW="2xl"
      mx="auto"
      bg={useColorModeValue("white", "gray.700")}
      shadow={{ sm: "base" }}
      rounded={{ sm: "lg" }}
      px={{ base: "6", md: "8" }}
      pb={{ base: "6", md: "8" }}
      {...rest}
    >
      {avatarProps.name ? (
        <Avatar
          mt="-10"
          borderWidth="6px"
          borderColor={useColorModeValue("white", "gray.700")}
          size="xl"
          {...avatarProps}
        />
      ) : (
        <Box
          mt="-10"
          borderWidth="6px"
          background="white"
          borderRadius={100}
          borderColor={useColorModeValue("white", "gray.700")}
          size="xl"
          marginX="auto"
        >
          <BoringAvatar
            size={80}
            name={session?.user?.email}
            variant="ring"
            colors={["#B31237", "#F03813", "#FF8826", "#FFB914", "#2C9FA3"]}
          />
        </Box>
      )}
      <Box position="absolute" top="4" insetEnd={{ base: "6", md: "8" }}>
        {action}
      </Box>
      {children}
    </Flex>
  );
};
