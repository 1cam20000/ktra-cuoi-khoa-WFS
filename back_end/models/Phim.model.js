import mongoose from "mongoose";

const phimSchema = new mongoose.Schema(
  {
    ID: Number,
    name: String,
    time: Number,
    year: Number,
    image: String,
    introduce: String,
  },
  {
    timestamps: true,
  }
);
const PhimModel = mongoose.model("Phim", phimSchema);

export { PhimModel, phimSchema };
