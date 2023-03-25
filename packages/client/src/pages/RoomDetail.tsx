import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled/macro";
import { Global, css } from "@emotion/react";
import { io } from "socket.io-client";
import InputChat from "../components/ChatRoomDetail/InputChat";
import MesaageList from "../components/ChatRoomDetail/MessageList";
import TopNavigation from "../components/ChatRoomDetail/TopNavigation";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { fetchMyProfile } from "../apis/userApi";
import { fetchChatRoomDetail } from "../apis/roomApi";
import { fetchChatMessageList, sendChatMessage } from "../apis/chatApi";
import { AxiosError, AxiosResponse } from "axios";
import { IChat, IProfile, IRoom } from "../types";
import SentMessage from "../components/ChatRoomDetail/SentMessage";
import ReceiveMessage from "../components/ChatRoomDetail/ReceiveMessage";

const Base = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 64px;
  align-items: center;
  padding: 0 24px;
`;

const globalStyle = css`
  body {
    background-color: #abc1d1;
  }
`;

const RoomDetail: React.FC = () => {
  const scrollBottomRef = useRef<HTMLLIElement>(null); //채팅방 입장시 촤하단으로 스크롤 내리기 위함
  const { roomId } = useParams<string>();

  const { data: profileData } = useQuery<AxiosResponse<IProfile>, AxiosError>(
    "fetchMyProfile",
    fetchMyProfile
  );
  const { data: chatRoomDetailData } = useQuery<
    AxiosResponse<IRoom>,
    AxiosError
  >(["fetchChatRoomDetail", roomId], () =>
    fetchChatRoomDetail(roomId as string)
  );
  //파리미터로 룸 아이디를 받아서 쿼리키를 배열로

  const { data: chatListData } = useQuery<
    AxiosResponse<Array<IChat>>,
    AxiosError
  >(["fetchChatMessageList", roomId], () =>
    fetchChatMessageList(roomId as string)
  );

  const [messages, setMessages] = useState<Array<IChat>>(
    chatListData?.data || []
  );

  const mutation = useMutation("sendChatMessage", (content: string) =>
    sendChatMessage(roomId as string, content)
  );

  const handleSend = (content: string) => {
    if (content.length) {
      mutation.mutate(content);
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:8000", { path: "/socket.io" });
    socket.emit("join", roomId);

    socket.on("chat", (newMessage: IChat) => {
      setMessages((prev) => [...prev, newMessage]);
    });
  }, []);

  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Base>
      <Global styles={globalStyle}></Global>
      {chatRoomDetailData && (
        <TopNavigation
          title={chatRoomDetailData.data.user.username}
        ></TopNavigation>
      )}
      <Container>
        <MesaageList>
          {messages.map((message) =>
            message.senderId === profileData?.data.userId ? (
              <SentMessage
                senderId={message.senderId}
                content={message.content}
                timestamp={message.createdAt}
              ></SentMessage>
            ) : (
              <ReceiveMessage
                receiver={message.user?.username}
                senderId={message.senderId}
                content={message.content}
                timestamp={message.createdAt}
              ></ReceiveMessage>
            )
          )}
          <li ref={scrollBottomRef}></li>
        </MesaageList>
      </Container>
      <InputChat onClick={handleSend}></InputChat>
    </Base>
  );
};

export default RoomDetail;
