import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Logo } from "components/logo";
import * as React from "react";
import { PricingCard } from "./pricing-card";

const BillingFrequencyTypes = ["monthly", "yearly"] as const;
export type BillingFrequency = typeof BillingFrequencyTypes[number];

export const Pricing = () => {
  return (
    <Box as="section" bg={mode("gray.50", "gray.800")} py="20">
      <Box
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
      >
        <Center mb={4}>
          <Logo />
        </Center>
        <Heading
          as="h1"
          size="2xl"
          fontWeight="extrabold"
          textAlign={{ sm: "center" }}
        >
          Pricing
        </Heading>

        <Text
          mt="4"
          maxW="xl"
          mx="auto"
          fontSize="xl"
          color={mode("gray.600", "gray.400")}
          textAlign={{ sm: "center" }}
        >
          Gain consistency and grow your audience with PRO
        </Text>

        <SimpleGrid
          alignItems="flex-start"
          mt={{ base: "10", lg: "24" }}
          columns={{ base: 1, lg: 3 }}
          spacing={{ base: "12", lg: "8" }}
        >
          <PricingCard
            name="Starter"
            description="Best way to pave your road to indie hacking"
            price={49.99}
            features={[
              "First 6 modules",
              "Access to members only newsletter",
              "30 minutes session",
            ]}
          />
          <PricingCard
            popular
            name="Pro"
            description="Enjoy the whole course from building your services from the scratch to deploying them."
            price={99.99}
            features={[
              "Access to all modules",
              "Access to members only newsletter",
              "2 hours session",
            ]}
          />
          <PricingCard
            name="Business"
            description="Enjoy the full power of TweetHunter"
            price={"Tailored for your needs"}
            features={[
              "Company wide workshops",
              "Technical Mentorship",
              "Software Architecture review",
            ]}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
};
