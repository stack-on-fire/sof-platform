import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import splitbee from "@splitbee/web";
import axios from "axios";
import * as React from "react";
import { HiShieldCheck } from "react-icons/hi";
import { useMutation } from "react-query";

type Props = {
  title?: string;
  cta?: string;
  ctaDone?: string;
  reducedFontSize?: boolean;
};

export const Newsletter = ({ title, cta, ctaDone, reducedFontSize }: Props) => {
  const [email, setEmail] = React.useState("");
  const [emailFromLocalStorage, setEmailFromLocalStorage] =
    React.useState<string | null>(null);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("subscribedEmail") !== null) {
        setEmailFromLocalStorage(localStorage.getItem("subscribedEmail"));
      }
    }
  }, [emailFromLocalStorage]);
  const subscribeToEmailList = async () => {
    const res = await fetch("/api/sg-subscribe", {
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    splitbee.track("Email sub", { email });

    return res;
  };
  const { mutate, data, isLoading } = useMutation(subscribeToEmailList, {
    onSuccess: (res) => {
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("subscribedEmail", email);
        setEmailFromLocalStorage(email);
      }
    },
  });

  return (
    <Box as="section" bg={mode("gray.100", "gray.700")} py="12">
      <Box
        textAlign="center"
        bg={mode("white", "gray.800")}
        shadow="lg"
        maxW={{ base: "xl", md: "3xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
        py="12"
        rounded="lg"
      >
        <Box maxW="md" mx="auto">
          <Text
            color={mode("green.600", "green.400")}
            fontWeight="bold"
            fontSize="sm"
            letterSpacing="wide"
          >
            1,000+ PEOPLE ALREADY JOINED ❤️️
          </Text>
          <Heading
            mt="4"
            fontWeight="extrabold"
            size={reducedFontSize ? "lg" : "xl"}
          >
            {title ?? "Get useful programming tips and updates"}
          </Heading>
          <Box mt="6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Stack>
                <Input
                  isDisabled={isLoading || !!emailFromLocalStorage}
                  aria-label="Enter your email"
                  placeholder="Enter your email to join"
                  rounded="base"
                  value={emailFromLocalStorage || email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  isDisabled={email.length <= 4 || !!emailFromLocalStorage}
                  type="submit"
                  w="full"
                  colorScheme="orange"
                  size="lg"
                  textTransform="uppercase"
                  fontSize="sm"
                  fontWeight="bold"
                  isLoading={isLoading}
                  onClick={() => mutate()}
                >
                  {emailFromLocalStorage ? ctaDone ?? "Joined" : cta ?? "Join"}
                </Button>
              </Stack>
            </form>
            <Text color={mode("gray.600", "gray.400")} fontSize="sm" mt="5">
              <Box
                aria-hidden
                as={HiShieldCheck}
                display="inline-block"
                marginEnd="2"
                fontSize="lg"
                color={mode("green.600", "green.400")}
              />
              No spams. We&apos;re only send you relevant content
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
