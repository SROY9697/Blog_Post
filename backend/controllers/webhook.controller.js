import { Webhook } from "svix";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import dotenv from "dotenv";
dotenv.config();

export const clerkWebHook = async (req, res) => {
  //const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  const WEBHOOK_SECRET = "whsec_wZIoMF5mkMTX5iFYbvJeyLXckyyv5yW3";

  if (!WEBHOOK_SECRET) {
    throw new Error("webhook secret required");
  }
  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.log(err);

    res.status(400).json({
      message: "webhook verification failed",
    });
  }
  console.log("hii");

  console.log(evt.data);
  //
  if (evt.type === "user.created") {
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_image_url,
    });

    await newUser.save();
  }

  if (evt.type === "user.deleted") {
    const deletedUser = await User.findOneAndDelete({
      clerkUserId: evt.data.id,
    });

    await Post.deleteMany({ user: deletedUser._id });
    await Comment.deleteMany({ user: deletedUser._id });
  }

  return res.status(200).json({
    message: "Webhook received",
  });
};
