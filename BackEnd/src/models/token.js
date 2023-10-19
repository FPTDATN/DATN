import mongoose from "mongoose";
const tokenSchema = new mongoose.Schema(
    {
        userId: {
            type: String
        },
        token: {
            type: String,
        }
    },
);

export default mongoose.model("Token", tokenSchema);
