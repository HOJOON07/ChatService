import { Router } from "express";
import { v4 as uuid } from "uuid";
import { Op } from "sequelize";
import User from "../schemas/user";

const router = Router();

// 유저 목록

router.get("/", async (req, res) => {
  try {
    const result = await User.findAndCountAll({
      where: {
        id: {
          // @ts-ignore
          [Op.ne]: req.session.userId,
          //해당 조건에 해당하는 유저목록들이 응답하고 카운트까지 응답에 포함하게 된다. 친구목록을 표시하기 위해 op.ne를 where절에 추가해준것.
        },
      },
    });
    res.json(result);
  } catch (e) {}
});

// 세션 조회
router.get("/me", async (req, res) => {
  try {
    res.json({
      // @ts-ignore
      username: req.session.username,
      // @ts-ignore
      userId: req.session.userId,
      // @ts-ignore
      isLogged: req.session.isLogged,
    });
  } catch (e) {}
});

// 로그인

router.post("/login", async (req, res) => {
  try {
    const userId = uuid();
    const username = req.body.username;

    const user = await User.create({
      id: userId,
      username,
    });
    // @ts-ignore
    req.session.username = username;
    // @ts-ignore
    req.session.userId = userId;
    // @ts-ignore
    req.session.isLogged = true;

    req.session.save(() => {
      res.json({
        statusText: "OK",
        data: user,
      });
    });
  } catch (e) {}
});

// 로그아웃

router.post("/logout", async (req, res) => {
  try {
    // @ts-ignore
    delete req.session.user;

    req.session.save(() => {
      res.redirect("/");
    });
  } catch (e) {}
});

export default router;
