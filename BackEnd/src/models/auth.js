import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const authSchame = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  country: {
    type: String,
  },

  rule: {
    type: Boolean,
  },

  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  favourite: [{ type: mongoose.Types.ObjectId, ref: "Favourite" }],

  role: {
    type: String,
    default: "member",
  },
});
authSchame.plugin(mongoosePaginate);
export default mongoose.model("Auth", authSchame);
