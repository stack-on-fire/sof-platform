import {
  Center,
  HStack,
  Icon,
  StackProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { HiCalendar } from "react-icons/hi";

interface UserInfoProps extends StackProps {
  memberSince: string;
}

export const UserInfo = (props: UserInfoProps) => {
  const { memberSince } = props;
  return (
    <Center
      spacing={{ base: "1", sm: "6" }}
      mt="4"
      fontSize="sm"
      fontWeight="medium"
      color={useColorModeValue("blue.600", "blue.300")}
    >
      <HStack>
        <Icon as={HiCalendar} />
        <Text>{memberSince}</Text>
      </HStack>
    </Center>
  );
};
