import React from "react";
import styled from "@emotion/styled/macro";

import { BiSearchAlt2 } from "react-icons/bi";
import { RiChatNewLine } from "react-icons/ri";
import { HiOutlineMusicNote } from "react-icons/hi";
import { AiOutlineSetting } from "react-icons/ai";

const Base = styled.div``;

const Title = styled.h1``;

const ActionItemContainer = styled.div``;

const ActionItem = styled.div``;

const TopNavigation: React.FC = () => {
  return (
    <Base>
      <Title></Title>
      <ActionItemContainer>
        <ActionItem>
          <BiSearchAlt2></BiSearchAlt2>
        </ActionItem>
      </ActionItemContainer>
    </Base>
  );
};
export default TopNavigation;
