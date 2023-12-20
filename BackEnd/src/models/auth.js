import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const authSchame = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },

  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  favourite: [{ type: mongoose.Types.ObjectId, ref: "Favourite" }],

  loginAttempts: {
    type: Number,
    default: 0,
  },
  lockedUntil: {
    type: Date,
    default: null,
  },
  role: {
    type: String,
    default: "member",
  },
},
  {
    timestamps: true,
    versionKey: false,
  });
authSchame.plugin(mongoosePaginate);
export default mongoose.model("Auth", authSchame);
