const ProductsModel = require("../models/ProductsModel");

// C=Create
exports.CreateProduct = async (req, res) => {
  try {
    let reqBody = req.body;
    const data = await ProductsModel.create(reqBody);
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }
};

// R=Read
exports.ReadProduct = async (req, res) => {
  try {
    const data = await ProductsModel.find();
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    console.error("Error in ReadProduct:", err);
    res.status(400).json({ status: "fail", data: err });
  }
};

// R=Read By ID
exports.ReadProductByID = async (req, res) => {
  try {
    let id = req.params.id;
    let Query = { _id: id };
    const data = await ProductsModel.find(Query);
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }
};

// U=Update
exports.UpdateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let Query = { _id: id };
    let reqBody = req.body;
    const data = await ProductsModel.updateOne(Query, reqBody);
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }
};

// D=Delete
exports.DeleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let Query = { _id: id };
    const data = await ProductsModel.deleteOne(Query);
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }
};
