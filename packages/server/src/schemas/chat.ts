import { DataType, DataTypes } from "sequelize";
import sequelize from "../sequelize";
import Room from "./room";
import User from "./user";

const Chat = sequelize.define("chat", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: DataTypes.STRING,
  senderId: {
    type: DataTypes.UUID,
    references: {
      model: User,
    },
  },
  roomId: {
    type: DataTypes.INTEGER,
    references: {
      model: Room,
    },
  },
});

export default Chat;
