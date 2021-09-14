import {
  useColorMode,
  HTMLChakraProps,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";

type ExtendedProps = { preserveText?: boolean };
type Props = HTMLChakraProps<"svg"> & ExtendedProps;

export const Logo = (props: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Stack isInline alignItems="center">
      <Image
        src={colorMode === "dark" ? "/dark-logo.svg" : "/logo.svg"}
        alt="Picture of the author"
        width={140}
        height={60}
      />
    </Stack>
  );
};
