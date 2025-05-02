const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    ProductName: { type: String, required: true },
    ProductCode: { type: String, unique: true, required: true },
    Img: { type: String, required: true },
    UnitPrice: { type: Number, required: true },
    Qty: { type: Number, required: true, default: 0 },
    TotalPrice: { type: Number, required: true },
    CreatedDate: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ProductsModel = mongoose.model("products", DataSchema); //Here products is database's collection name
module.exports = ProductsModel;
