import { Box } from "@chakra-ui/layout";
import { Navbar } from "components";
import Courses from "components/courses";
import { fetchAPI } from "lib/api";
import React from "react";

const Platform = ({ courses }) => {
  return (
    <Box>
      <Navbar />
      <Courses courses={courses} />
    </Box>
  );
};

export default Platform;

export async function getStaticProps() {
  const courses = await fetchAPI("/courses");

  return {
    props: {
      courses,
    },
  };
}
