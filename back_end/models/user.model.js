import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    age: Number,
    phone: String,
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

export { UserSchema, UserModel };
