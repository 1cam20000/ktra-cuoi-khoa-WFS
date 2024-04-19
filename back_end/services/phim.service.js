import { PhimModel } from "../models/Phim.model.js";
// create a new phim
const createPhim = async (body) => {
  const phim = await PhimModel.create(body);
  return phim;
};
//update phim
const updatePhim = async (id, body) => {
  const phim = await PhimModel.findOneAndUpdate(id, body, {
    new: true,
  }).exec();
  return phim;
};
//xoa phim
// const deletePhim = async (id) => {
//   const phim = await PhimModel.findByIdAndDelete(id).exec();
//   return phim;
// };

export { createPhim, updatePhim };
