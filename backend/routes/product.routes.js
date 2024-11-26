// IMPORTING
import { Router } from "express";
import { createImage, createProduct } from "../controllers/product.controller.js";
import { getProducts } from "../controllers/product.controller.js";
import { getProductById } from "../controllers/product.controller.js";
import { deleteProductById } from "../controllers/product.controller.js";
import { updateProductById } from "../controllers/product.controller.js";
const router = Router();

// Product routes.
router.route("/create").post(createProduct);
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
router.route('/:id').delete(deleteProductById);
router.route('/:id').put(updateProductById);
router.route('/upload').post(createImage);

export default router;