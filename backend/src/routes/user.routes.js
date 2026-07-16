import express from "express";
import { login, register } from "../controllers/user.controller.js";
import { uploadSingle } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", uploadSingle("image"), register);
router.post("/login", login);

export default router;
