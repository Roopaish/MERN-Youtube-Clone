# Express Js Server

## Project Overview

```bash
index.js                                          # main entry point
models/*.js                                       # database schemas
routes/*.js                                       # define routes
controllers/*.js                                  # logics for different routes
```

```js
// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [String],
    },
  },
  { timestamps: true } // to keep creation and updated date of the user
);

export default mongoose.model("User", UserSchema); // User is the collection name in the database with UserSchema
```

```js
// controllers/user.js
export const user = () => {
  // TODO: Business logic
};
```

```js
// routes/users.js
import express from "express";
import { user } from "../controllers/user.js";

const router = express.Router();
router.get("/", user);

export default router;
```
