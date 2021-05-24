import {
  Menu,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useColorModeValue,
  Center,
  Switch,
  Stack,
  Flex,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import Payment from "components/payment";
import SubscriptionManagement from "components/subscriptionManagement";
import * as React from "react";
import { AccountSwitcherButton } from "./account-switcher-button";
import { signOut } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/client";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const AccountSwitcher = ({ user }) => {
  const [session, loading] = useSession();
  const { colorMode, toggleColorMode } = useColorMode();

  const router = useRouter();
  return (
    <Menu>
      <AccountSwitcherButton user={user} />
      <MenuList
        shadow="lg"
        py="4"
        color={useColorModeValue("gray.600", "gray.200")}
        px="3"
      >
        <Flex justifyContent="space-between">
          <Box />
          <Stack ml={3} isInline>
            <SunIcon />
            <Switch
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
            />
            <MoonIcon />
          </Stack>
        </Flex>
        <MenuItem onClick={() => router.push("/")}>Learn more</MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/");
            setTimeout(() => {
              signOut();
            }, 600);
          }}
          rounded="md"
        >
          Logout
        </MenuItem>

        {
          //@ts-ignore
          session?.user?.data?.subscription?.isSubscribed ? ( // @dimitri : to fix
            <>
              <MenuDivider />
              <SubscriptionManagement session={session} />
            </>
          ) : (
            <>
              <MenuDivider />
              <Payment plan="start" session={session} />
            </>
          )
        }
      </MenuList>
    </Menu>
  );
};
