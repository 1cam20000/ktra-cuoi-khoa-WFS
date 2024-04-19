import jwt from "jsonwebtoken";
import { findOneUserWithoutPassword } from "../services/user.service.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "k tim thay token" });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    console.log("🚀 ~ authMiddleware ~ decodedToken:", decodedToken);

    const user = await findOneUserWithoutPassword({ _id: decodedToken._id });
    console.log("🚀 ~ authMiddleware ~ user:", user);
    if (!user) {
      return res
        .status(401)
        .json({ message: "k tim thay nguoi dung theo _id" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { authMiddleware };
