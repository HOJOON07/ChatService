import React from "react";
import { Routes, Route } from "react-router-dom";
import Friends from "./pages/Friends";
import Lobby from "./pages/Lobby";
import RoomDetail from "./pages/RoomDetail";
import RoomList from "./pages/RoomList";
import SeeMore from "./pages/SeeMore";

function App() {
  return (
    <Routes>
      <Route index element={<Lobby />}></Route> {/* 로비*/}
      <Route path="/friends" element={<Friends />}></Route> {/* 친구페이지*/}
      <Route path="/rooms" element={<RoomList />}></Route> {/* 방목록 */}
      <Route path="/rooms/:roomId" element={<RoomDetail />}></Route>
      {/* 상세페이지*/}
      <Route path="/more" element={<SeeMore />}></Route> {/* 더보기 페이지 */}
      <Route></Route>
    </Routes>
  );
}

export default App;
