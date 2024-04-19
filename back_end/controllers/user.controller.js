import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import {
  createUser,
  findOneUser,
  getDetailUserProfile,
  updateUser,
} from "../services/user.service.js";
import { authMiddleware } from "../middlewares/validateToken.middleware.js";
const userRouter = express.Router();
//resister
userRouter.post("/resister", async (req, res) => {
  const { email, password, name, phone, address, birth, gender, age } =
    req.body;
  const emailExisted = await findOneUser({ email });
  // console.log("🚀 ~ userRouter.post ~ emailExisted:", emailExisted);
  if (emailExisted) {
    return res.status(400).json({ message: "email already exists" });
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      password: passwordHash,
      name,
      phone,
      age,
      email,
    });

    res.json(newUser);
  }
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("🚀 ~ userRouter.post ~ req.body:", req.body);
  //tim kiem dang nhap theo email
  const user = await findOneUser({ email });
  //neu email ton tai
  if (user) {
    console.log("🚀 ~ userRouter.post ~ user:", user);
    //kiem tra pass - so sanh : compare
    const checkPass = await bcrypt.compare(password, user.password);
    console.log("🚀 ~ userRouter.post ~ checkPass:", checkPass);
    //neu pass dung
    if (checkPass) {
      const { name, phone, address, birth, gender, age, email, _id } = user;
      //create payload
      const payload = {
        _id,
        email,
        name,
        phone,
        email,
      };
      console.log("🚀 ~ userRouter.post ~ payload:", payload);
      //create token
      const token = jwt.sign(payload, process.env.KEY_TOKEN, {
        expiresIn: "7d",
      });
      //tra ve token cho nguoi dung de goi cac api san phan
      res.json(token);
    }
    //neu pass sai
    else {
      res.json({ message: "password is incorrect" });
    }
  }
  //neu k ton tai email
  else {
    res.json({ message: "email is incorrect" });
  }
});

userRouter.get("/detail-profile", authMiddleware, async (req, res) => {
  const { _id } = req.user;
  const user = await getDetailUserProfile({ _id });
  res.json(user);
});

//edit profile
userRouter.put("/edit-profile", authMiddleware, async (req, res) => {
  const { name, phone, age } = req.body;
  console.log("🚀 ~ userRouter.put ~ req.body:", req.body);
  const { _id } = req.user;
  const user = await updateUser(_id, {
    name,
    phone,
    age,
  });
  res.json(user);
});

export { userRouter };
