import React from "react";
import Image from "next/image";
import { Box, Center, Stack } from "@chakra-ui/layout";
import { motion } from "framer-motion";

const listItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const CurvedStack = () => {
  const icons = [
    "react",
    "chakra",
    "next",
    "docker",
    "nestjs",
    "graphql",
    "postgresql",
    "prisma",
    "digitalocean",
  ];
  const middleIndex = Math.floor(icons.length / 2);
  return (
    <Center>
      <motion.ul variants={container} initial="hidden" animate="show">
        <Stack isInline spacing={2}>
          {icons.map((icon, index) => {
            const moduleFromMiddle = Math.abs(middleIndex - index);
            const collapseValue = Math.abs(moduleFromMiddle - middleIndex);
            const top = collapseValue * 20 + "px";

            return (
              <motion.li
                style={{ listStyleType: "none" }}
                key={index}
                variants={listItem}
              >
                <Box position="relative" top={top}>
                  <Image src={`/${icon}.svg`} width={50} height={50} />
                </Box>
              </motion.li>
            );
          })}
        </Stack>
      </motion.ul>
    </Center>
  );
};

export default CurvedStack;
