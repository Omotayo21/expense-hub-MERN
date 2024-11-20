/*import express from 'express'
//import Product from "./models/productModel.js"
const router = express.Router();
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControler.js"*/
 const express = require("express");
 const Product = require("../models/productModel.js");
 const router = express.Router();
 const {
   getProducts,
   getProduct,
   createProduct,
   updateProduct,
   deleteProduct,
 } = require("../controllers/productControler.js");

router.get("/", getProducts);
router.get("/:id", getProduct);

router.post("/", createProduct);

// update a product
router.put("/:id", updateProduct);

// delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
