import { Router } from "express";
import {
  auth,
  login,
  logout,
  register,
} from "./src/controller/userController.js";

export const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

router.get("/me", auth);
