import express from "express";
import { PhimModel } from "../models/Phim.model.js";
import { createPhim, updatePhim } from "../services/phim.service.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { uploadCloud } from "../config/cloudinary.config.js";

//
const phimRouter = express.Router();
//get danh sach phim
phimRouter.get("/tat-ca-phim", async (req, res) => {
  const phims = await PhimModel.find();
  res.json(phims);
});
//them phim moi
phimRouter.post("/them-phim", async (req, res) => {
  const { ID, name, time, year, image, introduce } = req.body;
  //   console.log("🚀 ~ phimRouter.post ~ req.body:", req.body);
  const phims = await createPhim({
    ID,
    name,
    time,
    year,
    image,
    introduce,
  });
  res.json(phims);
});
//cap nhat phim
phimRouter.put("/cap-nhat-thong-tin-phim", async (req, res) => {
  const { ID, name, time, year, image, introduce } = req.body;
  const phims = await updatePhim(ID, {
    ID,
    name,
    time,
    year,
    image,
    introduce,
  });
  res.json(phims);
});
//xoa phim
phimRouter.delete("/xoa-phim/:id", async (req, res) => {
  try {
    const { ID } = req.body;
    console.log("🚀 ~ phimRouter.delete ~ ID:", ID);
    const deletedPhim = await PhimModel.findByIdAndDelete(ID);
    res.json({ message: "Deleted phim" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tìm kiếm phim theo tên
phimRouter.post("/search", async (req, res) => {
  const { keyword } = req.body;

  try {
    const result = await PhimModel.find({
      $or: [
        { name: { $regex: new RegExp(keyword, "i") } },
        { introduce: { $regex: new RegExp(keyword, "i") } },
      ],
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Danh sách phim được sắp xếp theo năm
phimRouter.get("/sorted", async (req, res) => {
  try {
    const sortedPhimList = await PhimModel.find().sort({ year: 1 });
    res.json(sortedPhimList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// phimRouter.post(
//   "/cloudinary-upload",
//   uploadCloud.single("file"),
//   (req, res, next) => {
//     if (!req.file) {
//       next(new Error("No file uploaded!"));
//       return;
//     }

//     res.json({ secure_url: req.file.path });
//   }
// );

export { phimRouter };
