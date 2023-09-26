import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const authSchame = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  images: {
    type: String,
  },
  comments: [
    {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
    },
],
  role: {
    type: String,
    default: "member",
  },
});
authSchame.plugin(mongoosePaginate);
export default mongoose.model("Auth", authSchame);
