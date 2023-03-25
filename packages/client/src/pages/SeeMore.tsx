import React from "react";
import styled from "@emotion/styled/macro";
import BottomNavigation from "../components/BottomNavigation";
import TopNavigation from "../components/TopNavigation";
import UserInfo from "../components/SeeMore/UserInfo";
import IconButtonList from "../components/SeeMore/IconButtonList";

const Base = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 12px;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SeeMore: React.FC = () => {
  return (
    <Base>
      <Container>
        <TopNavigation title="더보기"></TopNavigation>
        <UserInfo username="김호준" telNo="010-4140-5909"></UserInfo>
        <IconButtonList></IconButtonList>
        <BottomNavigation></BottomNavigation>
      </Container>
    </Base>
  );
};

export default SeeMore;
