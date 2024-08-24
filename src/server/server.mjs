import path from "path";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import formidable from "express-formidable";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


//db connection....
try {
  await mongoose.connect(process.env.DB_URI);
  console.log("Connected to MongoDB");
} catch (er) {
  console.log(er);
}

//cloudinary config...
try {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
} catch (err) {
  console.log(err);
}

import endpoints from "./endpoints/index.mjs";
app.use("/api", endpoints);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
