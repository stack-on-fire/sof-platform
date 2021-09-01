import {
  Box,
  Heading,
  Img,
  Stack,
  Text,
  Input,
  Button,
  useColorModeValue as mode,
  Divider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation } from "react-query";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [emailFromLocalStorage, setEmailFromLocalStorage] = React.useState<
    string | null
  >(null);
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

    return res;
  };

  const { mutate, isLoading } = useMutation(subscribeToEmailList, {
    onSuccess: (res) => {
      if (res.status === 200) {
        localStorage.setItem("subscribedEmail", email);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}
    >
      <Stack maxW="md" spacing="4" direction={{ base: "column", sm: "row" }}>
        <Input
          isDisabled={isLoading || !!emailFromLocalStorage}
          value={emailFromLocalStorage || email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your Email"
        />
        <Button
          isDisabled={!!emailFromLocalStorage}
          isLoading={isLoading}
          colorScheme="orange"
          px="10"
          type="submit"
        >
          {!!emailFromLocalStorage ? "Subscribed" : "Subscribe"}
        </Button>
      </Stack>
    </form>
  );
};

const MdxNewsletter = () => {
  return (
    <Box as="section" py="12">
      <Divider mb={4} />
      <Box>
        <Stack direction="row" justify="space-between" align="center">
          <Box maxW="2xl">
            <Heading size="lg" fontWeight="extrabold" mb="2">
              Want to build your own software and sell it?
            </Heading>
            <Text color={mode("gray.600", "gray.400")} mb="6">
              Subscribe to stackonfire 🔥 newsletter. Get some hot SaaS tips,
              new technologies, and latest trends in web development straight
              into your inbox.
            </Text>
            <SubscribeForm />
          </Box>
          <Box display={{ base: "none", lg: "block" }}>
            <Img
              src="https://images.unsplash.com/photo-1512626120412-faf41adb4874?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGVtYWlsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
              htmlWidth="380"
              htmlHeight="256"
              height="auto"
              objectFit="cover"
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default MdxNewsletter;
