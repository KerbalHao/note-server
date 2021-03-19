/*
 * @Date: 2021-03-17 16:05:16
 * @LastEditors: KerbalHao
 * @FilePath: \server\routes\auth.js
 */
let express = require("express");
let { checkUsername, checkPassword } = require("../helpers/check");
let { hash } = require("../helpers/util");
let { model } = require("../models");

const router = express.Router();
// // 新建用户
router.post("/register", checkUsername, checkPassword, (req, res, next) => {
  console.log("/register");
  let username = req.body.username;
  let password = req.body.password;

  console.log(model);
  model.User.findOrCreate({
    where: { username },
    defaults: { encryptPassword: hash(password) }
  }).spread((user, created) => {
    if (!created) {
      return res.status(400).send({ msg: "用户已存在" });
    }
    let json = user.get({ plain: true });
    req.session.user = json;
    delete json.encryptPassword;
    res.send({ msg: "创建成功", data: json });
  });
});

// 认证登录状态
router.get("/", (req, res, next) => {
  console.log(req.session);
  if (req.session.user) {
    res.send({ isLogin: true, data: req.session.user });
  } else {
    res.send({ isLogin: false });
  }
});

// 退出登录
router.get("/logout", (req, res, next) => {
  if (req.session.user) {
    req.session.destroy();
    res.send({ msg: "注销成功" });
  } else {
    res.status(400).send({ msg: "当前用户尚未登录" });
  }
});

// 注册
router.post("/login", checkUsername, checkPassword, (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log(req.session);
  model.User.findOne({ where: { username } }).then(
    (user) => {
      if (!user) {
        return res.status(400).send({ msg: "用户不存在" });
      }
      if (user.encryptPassword !== hash(password)) {
        return res.status(400).send({ msg: "密码不正确" });
      }
      let json = user.get({ plain: true });
      req.session.user = json;
      delete json.encryptPassword;
      res.send({ msg: "登录成功", data: json });
    },
    (err) => {
      console.log(err);
    }
  );
});

module.exports = router
