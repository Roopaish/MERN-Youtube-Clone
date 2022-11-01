import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({
    userId: req.user.id,
    ...req.body,
  });

  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedVideo);
    } else {
      next(createError(403, "You can only update your video"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("Video is deleted!");
    } else {
      next(createError(403, "You can only delete your video"));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.status(200).json("View has been increased");
  } catch (err) {
    next(err);
  }
};

export const getRandomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]); // get 40 random videos
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const getTrendingVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 }); // -1 for most viewed and 1 for least viewed
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const getSubscribedVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => Video.find({ userId: channelId }))
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt)); // flat(): [[{}],[{}]] => [{},{}]
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 }); // -1 for most viewed and 1 for least viewed
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const searchVideo = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 }); // -1 for most viewed and 1 for least viewed
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};