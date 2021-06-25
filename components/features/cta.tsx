import { Box, BoxProps, Center, HTMLChakraProps } from "@chakra-ui/react";
import * as React from "react";
import { BiRightArrowAlt } from "react-icons/bi";

export const Cta = (props: HTMLChakraProps<"button">) => {
  const { children, ...rest } = props as BoxProps & any;
  return (
    <Center
      minW="240px"
      as="button"
      px="6"
      py="4"
      textTransform="uppercase"
      fontWeight="bold"
      transition="all 0.2s"
      rounded="lg"
      outline={0}
      bg="orange.500"
      color="white"
      _focus={{ shadow: "outline" }}
      _active={{ transform: "translateY(2px)" }}
      _hover={{ bg: "orange.600" }}
      {...rest}
    >
      {children}
      <Box as={BiRightArrowAlt} ml="2" fontSize="lg" />
    </Center>
  );
};
