import React from "react";
import { Box, Center, Stack } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import ReactSvg from "components/svg-icons/react";
import ChakraSvg from "components/svg-icons/chakra";
import NextSvg from "components/svg-icons/next";
import DockerSvg from "components/svg-icons/docker";
import NestJSSVg from "components/svg-icons/nestjs";
import GraphQLSvg from "components/svg-icons/graphql";
import PgSvg from "components/svg-icons/postgresql";
import PrismaSvg from "components/svg-icons/prisma";
import DigitalOceanSvg from "components/svg-icons/digitalocean";
import { SiNodeDotJs } from "react-icons/si";
import {
  Icon,
  SimpleGrid,
  theme,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";

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
    "nodejs",
  ];

  const fill = useColorModeValue(
    theme.colors.gray[600],
    theme.colors.gray[200]
  );
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  const iconsMapping = {
    react: <ReactSvg width="60px" height="60px" fill={fill} />,
    chakra: <ChakraSvg width="60px" height="60px" fill={fill} />,
    next: <NextSvg width="60px" height="60px" fill={fill} />,
    docker: <DockerSvg width="60px" height="60px" fill={fill} />,
    nestjs: <NestJSSVg width="60px" height="60px" fill={fill} />,
    graphql: <GraphQLSvg width="60px" height="60px" fill={fill} />,
    postgresql: <PgSvg width="60px" height="60px" fill={fill} />,
    prisma: <PrismaSvg width="60px" height="60px" fill={fill} />,
    digitalocean: <DigitalOceanSvg width="60px" height="60px" fill={fill} />,
    nodejs: <Icon as={SiNodeDotJs} width="60px" height="60px" fill={fill} />,
  };

  const middleIndex = Math.floor(icons.slice(0, 9).length / 2);

  return (
    <Center>
      <motion.ul variants={container} initial="hidden" animate="show">
        {isLargerThan700 ? (
          <Stack isInline spacing={2}>
            {icons.splice(0, 9).map((icon, index) => {
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
                    {iconsMapping[icon]}
                  </Box>
                </motion.li>
              );
            })}
          </Stack>
        ) : (
          <SimpleGrid columns={5} gap={2}>
            {icons.map((icon, index) => {
              return (
                <motion.li
                  style={{ listStyleType: "none" }}
                  key={index}
                  variants={listItem}
                >
                  <Box>{iconsMapping[icon]}</Box>
                </motion.li>
              );
            })}
          </SimpleGrid>
        )}
      </motion.ul>
    </Center>
  );
};

export default CurvedStack;
