import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getByTag,
  getRandomVideos,
  getSubscribedVideos,
  getTrendingVideos,
  getVideo,
  searchVideo,
  updateVideo,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// create the video
router.post("/", verifyToken, addVideo);

// Update the video
router.put("/:id", verifyToken, updateVideo);

// Delete the video
router.delete("/:id", verifyToken, deleteVideo);

// Get the video
router.get("/find/:id", getVideo);

// Update video views
router.get("/view/:id", addView);

// Get trending videos
router.get("/trend", getTrendingVideos);

// Get random video
router.get("/random", getRandomVideos);

// Get subscribed channels video
router.get("/sub", verifyToken, getSubscribedVideos);

// Search videos
router.get("/tags", getByTag);
router.get("/search", searchVideo);

export default router;
