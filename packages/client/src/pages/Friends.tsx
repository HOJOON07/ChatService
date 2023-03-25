import React from "react";
import styled from "@emotion/styled/macro";
import { useNavigate } from "react-router-dom";
import TopNavigation from "../components/TopNavigation";
import BottomNavigation from "../components/BottomNavigation";
import Profile from "../components/Profile";
import FriendList from "../components/FriendList";
import { useMutation, useQuery } from "react-query";
import { fetchMyProfile, fetchUserList } from "../apis/userApi";
import { AxiosError, AxiosResponse } from "axios";
import { IProfile, IUser, IRoom } from "../types/index";
import Friend from "../components/FriendList/Friend";
import {
  fetchChatRoomList,
  makeChatRoom,
  MakeChatRoomRequest,
} from "../apis/roomApi";

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

const Summary = styled.small`
  margin: 4px 0;
  padding: 24px 0 0 0;
  font-size: 12px;
`;

const Friends: React.FC = () => {
  const navigate = useNavigate();
  const { data: profileData } = useQuery<AxiosResponse<IProfile>, AxiosError>(
    "fetchMyProfile",
    fetchMyProfile
  );

  const { data: userData } = useQuery<
    AxiosResponse<{ count: number; rows: Array<IUser> }>,
    AxiosError
  >("fetchUserList", fetchUserList);

  const { data: chatRoomListData } = useQuery<
    AxiosResponse<Array<IRoom>>,
    AxiosError
  >("fetchChatRoomList", fetchChatRoomList);

  const mutation = useMutation("makeChatRoom", (request: MakeChatRoomRequest) =>
    makeChatRoom(request)
  );

  const handleChatRoomCreate = (opponentId: string) => {
    //먼저 존재하는 채팅방을 확인해야 함
    const chatRoom = chatRoomListData?.data.find(
      (chatRoom) => chatRoom.opponentId === opponentId
    );
    //존재하는 룸이 있으면 거기로 이동.
    if (chatRoom) {
      navigate(`/rooms/${chatRoom.id}`);
    } else {
      mutation.mutate(
        {
          opponentId,
        },
        {
          onSuccess: (data) => {
            navigate(`/room/${data.data.id}`); //s없어도 되나?
          },
        }
      );
    }
  };
  return (
    <Base>
      <Container>
        <TopNavigation title="친구"></TopNavigation>
        {profileData && (
          <Profile username={profileData.data.username}></Profile>
        )}
        {userData && (
          <>
            <Summary>친구 : {userData.data.count}</Summary>
            <FriendList>
              {userData.data.rows.map((row) => (
                <Friend
                  key={row.id}
                  username={row.username}
                  thumbnailImage={row.thumbnailImageUrl}
                  onClick={() => handleChatRoomCreate(row.id)}
                ></Friend>
              ))}
            </FriendList>
          </>
        )}

        <BottomNavigation></BottomNavigation>
      </Container>
    </Base>
  );
};

export default Friends;
