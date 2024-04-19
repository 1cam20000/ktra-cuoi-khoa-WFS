import mongoose from "mongoose";

const connectMongodb = async () => {
  mongoose
    .connect(
      "mongodb+srv://cananhminh:Anhminhcam89@cluster0.0vaoaea.mongodb.net/cinema"
    )
    .then(() => console.log("🚀 ~ mongoose: connected"))
    .catch((err) => console.log("🚀 ~ mongoose error:", err));
};

export { connectMongodb };
