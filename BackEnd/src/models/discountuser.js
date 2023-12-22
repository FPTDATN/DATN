// modeles  cuả discountuser
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const discountuserSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            min: 0,
            unique: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },
        maxAmount: {
            type: Number,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

discountuserSchema.plugin(mongoosePaginate);
export default mongoose.model("Discountuser", discountuserSchema);
