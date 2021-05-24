import React from "react";

import { Box } from "@chakra-ui/layout";
import {
  Hero,
  Newsletter,
  Features,
  Footer,
  Pricing,
  Navbar,
} from "components";

const Index = () => {
  return (
    <Box>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Newsletter />
      <Footer />
    </Box>
  );
};

export default Index;
