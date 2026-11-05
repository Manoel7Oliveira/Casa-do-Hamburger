import { Router } from "express";
import { login, register } from "./src/controller/userController.js";

export const router = Router();

router.post("/login", login);
router.post("/register", register);
