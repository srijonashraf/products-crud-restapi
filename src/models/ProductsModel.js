const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    brand: { type: String, required: true },
    images: { type: String, required: true }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ProductsModel = mongoose.model("products", DataSchema);
module.exports = ProductsModel;
