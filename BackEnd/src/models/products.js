import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  sale_off: {
    type: Number,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  images: [
    {
      type: String,
    }
  ],
  sizeId: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Size"
    }
  ],
  brandId: {
    type: mongoose.Types.ObjectId,
    ref: "Brand"
  },
  colorId: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Color"
    }
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  }, favourite: {
    type: Boolean,
    default: false
  },
  sold: {
      type: Number,
      default: 0,
    },

}, {
  timestamps: true,
  versionKey: false
});

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
