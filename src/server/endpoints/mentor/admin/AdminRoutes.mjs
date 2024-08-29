import e from "express";
import mentor from "../../../models/mentor.mjs";
import student from "../../../models/student.mjs";
import query from "../../../models/query.mjs";

const adminMentRouter = e.Router();

adminMentRouter.get("/mentors/view", async (req, res) => {
  try {
    const mentors = await mentor.find();
    res.status(200).json({
      mentors: mentors.map((mentor) => {
        return {
          _id: mentor._id,
          name: mentor.name,
          kerberos: mentor.kerberos,
          course: mentor.course,
          hours: mentor.hours,
        };
      }),
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log(err);
  }
});

adminMentRouter.get("/mentors/view/:kerberos", async (req, res) => {
  try {
    const mentors = await mentor.findOne({ kerberos: req.params.kerberos });
    res.status(200).json({
      _id: mentors._id,
      name: mentors.name,
      kerberos: mentors.kerberos,
      course: mentors.course,
      phone_number: mentors.phone_number,
      hours: mentors.hours,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log(err);
  }
});

adminMentRouter.get("/student/view/", async (req, res) => {
  try {
    const students = await student.find();
    res.status(200).json({
      students: students.map((student) => {
        return {
          _id: student._id,
          name: student.name,
          phone_number: student.phone_number,
          kerberos: student.kerberos,
        };
      }),
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log(err);
  }
});

adminMentRouter.get("/student/view/:kerberos", async (req, res) => {
  try {
    const students = await student.findOne({ kerberos: req.params.kerberos });
    const queries = await query.find({ student: students._id });
    res.status(200).json({
      _id: students._id,
      name: students.name,
      kerberos: students.kerberos,
      phone_number: students.phone_number,
      queries: queries.map((query) => {
        return {
          _id: query._id,
          title: query.title,
          description: query.description,
          attachments: query.attachments,
          status: query.status,
        };
      }),
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log(err);
  }
});

export default adminMentRouter;
