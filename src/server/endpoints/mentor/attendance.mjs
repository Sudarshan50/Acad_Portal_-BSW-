import express from "express";
import Mentor from "../../models/mentor.mjs";
import Attendance from "../../models/attendance.mjs";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import formidable from "express-formidable";

const router = express.Router();

const config = formidable({
  multiples: true, // Enable multiple files
  maxFileSize: 10 * 1024 * 1024, // Limit file size to 10MB
});

//GET: get all attendance
router.get("/", async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ kerberos: req.body.kerberos });
    if (!mentor) {
      res.status(400).send("Mentor not found");
      return;
    }
    const attendances = await Attendance.find({ mentor: mentor._id });
    res.status(200).send(attendances);
  } catch (e) {
    res.status(500).send;
  }
});

router.post("/post", config, async (req, res) => {
  try {
    // console.log(req.fields);
    const mentor = await Mentor.findOne({ kerberos: req.fields.kerberos });
    if (!mentor) {
      return res.status(400).send("Mentor not found");
    }
    const uploadedFiles = req.files?.photo;
    // console.log(uploadedFiles);
    const fileUploads = [];
    const filesArray = Array.isArray(uploadedFiles)
      ? uploadedFiles
      : [uploadedFiles];

    for (const file of filesArray) {
      const filePath = file.path; 

      // Upload to Cloudinary
      const uploadPromise = cloudinary.uploader.upload(filePath, {
        public_id: `${uuidv4()}`,
        folder: "attendance",
      });

      fileUploads.push(uploadPromise);
    }

    const uploadResults = await Promise.all(fileUploads);
    const fileUrls = uploadResults.map((result) => result.secure_url);

    const attendance = new Attendance({
      mentor: mentor._id,
      date: new Date(req.fields.date),
      description: req.fields.description,
      photoPath: fileUrls,
    });
    await attendance.save();
    res.status(201).send(attendance);
    // If there's a file, rename it using the unique ID
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

export default router;
