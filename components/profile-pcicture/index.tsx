import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

const StyledImage = styled(Image)`
  border-radius: 50px;
`;

const ProfilePicture = ({ url }) => {
  return <StyledImage layout="responsive" height={20} width={20} src={url} />;
};

export default ProfilePicture;
