import express from "express";
import { getUserSavedPosts, savePost } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/savedPost", getUserSavedPosts);
router.patch("/save", savePost);

export default router;
