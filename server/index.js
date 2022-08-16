import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// import routes (name as you want cause they are default exports)
import commentsRoutes from "./routes/comments.js";
import usersRoutes from "./routes/users.js";
import videosRoutes from "./routes/videos.js";

// initialization
const app = express();
dotenv.config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((e) => {
      throw e;
    });
};

// registering routes
app.use("/api/users", usersRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/comments", commentsRoutes);

app.listen(8800, () => {
  connectDB();
  console.log("Connected to server!");
});
