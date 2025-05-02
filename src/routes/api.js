const express =require('express');
const ProductsController=require("../controllers/ProductsController")
const router =express.Router();

router.post("/product",ProductsController.CreateProduct);
router.get("/product",ProductsController.ReadProduct);
router.get("/product/:id",ProductsController.ReadProductByID);
router.put("/product/:id",ProductsController.UpdateProduct);
router.delete("/product/:id",ProductsController.DeleteProduct);



module.exports=router;