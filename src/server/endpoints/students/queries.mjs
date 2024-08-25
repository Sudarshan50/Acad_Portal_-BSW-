import express from "express";
import Query from "../../models/query.mjs";
import Student from "../../models/student.mjs";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import formidable from "express-formidable";

const queries_router = express.Router();
const config = formidable({
  multiples: true, // Enable multiple files
  maxFileSize: 10 * 1024 * 1024, // Limit file size to 10MB
});

queries_router.post("/create", config, async (req, res) => {
  try {
    const { kerberos, type, description } = req.fields;
    const uploadedFiles = req.files?.attachments;

    const student = await Student.findOne({ kerberos });
    if (!student) {
      return res.status(400).send("Student not found");
    }
    const fileUploads = [];
    if (uploadedFiles) {
      const filesArray = Array.isArray(uploadedFiles)
        ? uploadedFiles
        : [uploadedFiles];

      for (const file of filesArray) {
        const filePath = file.path; // Use `path` provided by express-formidable

        // Upload to Cloudinary
        const uploadPromise = cloudinary.uploader.upload(filePath, {
          public_id: `${uuidv4()}`,
          folder: "queries",
        });
        fileUploads.push(uploadPromise);
      }
    }
    const uploadResults = await Promise.all(fileUploads);
    const fileUrls = uploadResults.map((result) => result.secure_url);

    const query = new Query({
      student: student._id,
      type,
      description,
      attachments: fileUrls,
    });

    await query.save();
    res.status(201).send(query);
  } catch (e) {
    console.error("Error during file upload and save:", e);
    res.status(500).send("Internal server error");
  }
});

//GET: /student/queries?qid=&kerberos= - query of a student
queries_router.get("/one", async (req, res) => {
  try {
    const student = await Student.findOne({ kerberos: req.query.kerberos });
    if (!student) {
      res.status(400).send("Student not found");
      return;
    }
    const qid = req.query.qid;
    if (!qid) {
      res.status(400).send("Query ID not found");
      return;
    }
    const queries = await Query.find({
      student: student._id,
      _id: new ObjectId(qid),
    });
    if (queries.length == 0) {
      res.status(400).send("Query not found");
      return;
    }
    res.status(200).send(queries[0]);
  } catch (e) {
    res.status(500).send(e);
  }
});

//GET: /student/queries?kerberos=  - Get all queries of a student
queries_router.get("/", async (req, res) => {
  try {
    const student = await Student.findOne({ kerberos: req.query.kerberos });
    if (!student) {
      res.status(400).send("Student not found");
      return;
    }
    const queries = await Query.find({ student: student._id });
    res.status(200).send(queries);
  } catch (e) {
    res.status(500).send(e);
  }
});

//GET: /student/queries/taken - Get all resolved queries of a student
queries_router.get("/taken", async (req, res) => {
  try {
    console.log(req.query);
    const student = await Student.findOne({ kerberos: req.body.kerberos });
    if (!student) {
      res.status(400).send("Student not found");
      return;
    }
    const queries = await Query.find({ student: student._id, status: "TAKEN" });
    res.status(200).send(queries);
  } catch (e) {
    res.status(500).send(e);
  }
});

//UPDATE: /student/queries/resolve/:id - Resolve a query
queries_router.patch("/resolve/:id", async (req, res) => {
  try {
    const student = await Student.findOne({ kerberos: req.body.kerberos });
    if (!student) {
      res.status(400).send("Student not found");
      return;
    }
    const query = await Query.findOne({
      _id: new ObjectId(req.params.id),
      student: student._id,
      status: "TAKEN",
    });
    if (!query) {
      res.status(400).send("Query not found");
      return;
    }
    query.status = "RESOLVED";
    if (req.body.feedback) {
      query.feedback = req.body.feedback;
    }
    query.resolved_at = Date.now();
    await query.save();
    res.status(200).send(query);
  } catch (e) {
    res.status(500).send(e);
  }
});

//UPDATE: /student/queries/update/:id - Update a query
queries_router.patch("/update/:id", config, async (req, res) => {
  try {
    const student = await Student.findOne({ kerberos: req.fields.kerberos });
    if (!student) {
      res.status(400).send("Student not found");
      return;
    }
    const query = await Query.findOne({
      _id: req.params.id,
      student: student._id,
      status: "QUEUED",
    });
    // console.log(query);
    if (!query) {
      res.status(400).send("Query not found");
      return;
    }
    if (req.fields.type) {
      query.type = req.fields.type;
    }
    if (req.fields.description) {
      query.description = req.fields.description;
    }
    if (req.files.attachments) {
      const uploadedFiles = req.files?.attachments;
      for (const attachment of query.attachments) {
        const publicId = attachment.split("/").slice(-1)[0].split(".")[0];
        console.log(publicId);
        const del = await cloudinary.uploader.destroy(`queries/${publicId}`);
        console.log(del);
      }
      const fileUploads = [];
      const filesArray = Array.isArray(uploadedFiles)
        ? uploadedFiles
        : [uploadedFiles];
      for (const file of filesArray) {
        const filePath = file.path;
        const uploadPromise = cloudinary.uploader.upload(filePath, {
          public_id: `${uuidv4()}`,
          folder: "queries",
        });

        fileUploads.push(uploadPromise);
      }
      const uploadResults = await Promise.all(fileUploads);
      const fileUrls = uploadResults.map((result) => result.secure_url);
      query.attachments = fileUrls;
    }
    await query.save();
    res.status(200).send(query);
  } catch (e) {
    res.status(500).send(e);
  }
});

//DELETE: /student/queries/delete/:id - Delete a query
queries_router.delete("/delete/:id", async (req, res) => {
  try {
    const student = await Student.findOne({ kerberos: req.body.kerberos });
    if (!student) {
      res.status(400).send("Student not found");
      return;
    }
    const query = await Query.findOne({
      _id: req.params.id,
      student: student._id,
      status: "QUEUED",
    });
    if (!query) {
      res.status(400).send("Query can't be deleted, it is already available");
      return;
    }
    await Query.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
//GET: /student/queries/queued?qid=&kerberos= - query of a student
queries_router.get("/queued", async (req, res) => {
  try {
    const student = await Student.findOne({ kerberos: req.query.kerberos });
    if (!student) {
      res.status(400).send("Student not found");
      return;
    }
    const qid = req.query.qid;
    if (!qid) {
      res.status(400).send("Query ID not found");
      return;
    }
    const queries = await Query.find({
      student: student._id,
      _id: new ObjectId(qid),
      status: "QUEUED",
    });
    if (queries.length == 0) {
      res.status(400).send("Query not found");
      return;
    }
    res.status(200).send(queries[0]);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default queries_router;
