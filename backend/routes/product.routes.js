// IMPORTING
import { Router } from "express";
import { fileUpload } from "../utils/fileUpload.js";
import { createProduct } from "../controllers/product.controller.js";
import { getProducts } from "../controllers/product.controller.js";
import { getProductById } from "../controllers/product.controller.js";
import { deleteProductById } from "../controllers/product.controller.js";
import { updateProductById } from "../controllers/product.controller.js";
const router = Router();

// Product routes.
router.route("/create").post(fileUpload.single("image"), createProduct);
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
router.route('/:id').delete(deleteProductById);
router.route('/:id').put(updateProductById);

export default router;