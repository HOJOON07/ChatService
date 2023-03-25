import React, { ReactNode } from "react";
import styled from "@emotion/styled/macro";

const Base = styled.div`
  list-style: none;
  margin: 0;
  padding: 36px 0 64px 0;
`;

type Children = {
  children: ReactNode;
};

const ChatRoomList: React.FC<Children> = ({ children }: Children) => {
  return <Base>{children}</Base>;
};

export default ChatRoomList;
