import express, { Application } from "express";
import session from "express-session";
import cors from "cors";

import sequelize from "./sequelize";
import routes from "./routes";
import socket from "./socket";

const FileStore = require("session-file-store")(session);
const models = require("../models");

const app: Application = express();

const sessionMiddleware = session({
  secret: "cacaonibs", //세션 암호화 저장
  saveUninitialized: true, //세션이 저장되기 전에 언이니셜라이즈드 상태로 미리 만들어서 저장
  cookie: { secure: false }, // 세션을 언제 저장할지
  resave: false, // 익스프레스에서 권장된 설정
  store: new FileStore(),
});

app.use(sessionMiddleware); //세션 설정 완료
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sequelize.sync({ force: true });

app.use("/", routes);

const server = app.listen(8000, () => {
  console.log(`server is running 8000port `);
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB연결 성공!");
    })
    .catch((err: any) => {
      console.error(err);
      console.log("DB 연결 에러ㅜ");
      process.exit();
    });
});

// app.listen(port, () => {
//   console.log("서버가 실행되고 있습니다.");
//   models.sequelize
//     .sync()
//     .then(() => {
//       console.log("DB연결 성공!");
//     })
//     .catch((err) => {
//       console.error(err);
//       console.log("DB 연결 에러ㅜ");
//       process.exit();
//     });
// });

socket(server, app, sessionMiddleware);
