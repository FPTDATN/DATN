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
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  images: {
    type: String,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
});

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
