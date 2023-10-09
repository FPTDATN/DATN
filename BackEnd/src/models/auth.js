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
  firName: {
    type:String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address : {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  images: {
    type: String,
  },
  country: {
    type: String,
  },

  rule: {
    type: Boolean,
  },

  cardnumber: {
    type: Number,
  },


  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
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
