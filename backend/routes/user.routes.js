// IMPORTING
import { Router } from "express";
import { signUp } from "../controllers/user.controllers.js";
import { login } from "../controllers/user.controllers.js";
import { logout } from "../controllers/user.controllers.js";
import { getUsers } from "../controllers/user.controllers.js";
import { getUserById } from "../controllers/user.controllers.js";
const router = Router();

// User routes.
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/").get(getUsers);
router.route("/:id").get(getUserById);

export default router;