import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Img,
  useMenuButton,
} from "@chakra-ui/react";
import * as React from "react";
import { HiSelector } from "react-icons/hi";

export const AccountSwitcherButton = (props: FlexProps & any) => {
  const buttonProps = useMenuButton(props);

  return (
    <Flex
      as="button"
      {...buttonProps}
      display="flex"
      alignItems="center"
      rounded="lg"
      px="3"
      py="2"
      fontSize="sm"
      userSelect="none"
      cursor="pointer"
      outline="0"
      transition="all 0.2s"
      _focus={{ shadow: "outline" }}
    >
      <HStack flex="1" spacing="3">
        <Img
          w="8"
          h="8"
          rounded="md"
          objectFit="cover"
          src={props.user.image}
          alt="Chakra UI"
        />
        <Box textAlign="start">
          <Box isTruncated fontWeight="semibold">
            {props.user.name}
          </Box>
        </Box>
      </HStack>
      <Box fontSize="lg" color="gray.400">
        <HiSelector />
      </Box>
    </Flex>
  );
};
