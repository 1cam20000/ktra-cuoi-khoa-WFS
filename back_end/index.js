import express from "express";
import { connectMongodb } from "./database/connectMongodb.js";
import dotenv from "dotenv";
import { phimRouter } from "./controllers/Phim.router.js";
import { corsMiddleware } from "./middlewares/cordOption.js";
import { userRouter } from "./controllers/user.controller.js";
import cors from "cors";
//
const app = express();
app.use(express.json());
app.use(corsMiddleware);
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3088"],
  })
);
connectMongodb();
dotenv.config();
app.use("/phim", phimRouter);
app.use("/user", userRouter);
//
const port = 3088;
app.listen(port, console.log(`🚀 ~ run at http://localhost:${port}`));
