import React from "react";
import BottomNavigation from "../components/BottomNavigation";
import TopNavigation from "../components/TopNavigation";

const Lobby: React.FC = () => {
  return (
    <div>
      <TopNavigation title="Lobby"></TopNavigation>
      <BottomNavigation></BottomNavigation>
    </div>
  );
};

export default Lobby;
