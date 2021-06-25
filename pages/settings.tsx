import Courses from "components/courses";
import Layout from "components/layout";
import { UserCard } from "components/user-card";
import { useSession } from "next-auth/client";
import React from "react";
import Avatar from "boring-avatars";
import { Box } from "@chakra-ui/react";

const Settings = () => {
  const [session] = useSession();

  return (
    <Layout px={0}>
      <Box minH="75vh">
        <UserCard name={session?.user?.email} />
      </Box>
    </Layout>
  );
};

export default Settings;
