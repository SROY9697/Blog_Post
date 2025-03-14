import express from "express";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import commentRouter from "./routes/comment.js";
import webhookRouter from "./routes/webhook.js";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
const app = express();
//it is used to check user authentication for delete or create or update something
app.use(clerkMiddleware());
import dotenv from "dotenv";
dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL;
app.use(cors(CLIENT_URL));

app.use("/webhooks", webhookRouter);
//database
connectDB();
app.use(express.json({ extended: false }));

// allow cross-origin requests for imagekit to upoad images
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.get("/protect", (req, res) => {
//   const { userId } = req.auth;
//   if (!userId) {
//     return res.status(401).json("not authenticated");
//   }
//   res.status(200).json("content");
// });

//router
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

const PORT = process.env.PORT;

//error handling in express 5
app.use((error, req, res, next) => {
  console.log(error.stack);

  res.json({
    message: error.message || "something went wrong",
    status: error.status,
  });
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
