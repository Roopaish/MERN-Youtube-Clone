import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";
import User from "../models/User.js";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(404, "Wrong credentials!"));

    const { password, ...others } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT); // generating unique token based on id and secretKey

    res
      .cookie("access_token", token, {
        httpOnly: true, // 3rd party wont be able to use our cookie
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};
