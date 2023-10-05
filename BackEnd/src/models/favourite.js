import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const favouriteSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "Auth",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
favouriteSchema.plugin(mongoosePaginate);

export default mongoose.model('Favourite', favouriteSchema);
