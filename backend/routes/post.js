import express from "express";
import {
  getPosts,
  getPost,
  deletePost,
  createPost,
  uploadAuth,
  featurePost,
} from "../controllers/post.controller.js";

const router = express.Router();

//before image upload need to check authentication
router.get("/upload-auth", uploadAuth);
router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/feature", featurePost);

export default router;
