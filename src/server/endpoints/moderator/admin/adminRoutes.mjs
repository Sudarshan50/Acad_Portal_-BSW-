import e from "express";
import moderator from "../../../models/moderator.mjs";
import mentor from "../../../models/mentor.mjs";
import query from "../../../models/query.mjs";
import opportunity from "../../../models/opportunity.mjs";
import attendance from "../../../models/attendance.mjs";
import student from "../../../models/student.mjs";


const adminRouter = e.Router();

adminRouter.get("/mod/view", async (req, res) => {
  const moderators = await moderator.find();
  res.status(200).json({
    moderators: moderators.map((mod) => {
      return {
        _id: mod._id,
        name: mod.name,
        kerberos: mod.kerberos,
      };
    }),
  });
});
adminRouter.get("/mod/view/:kerberos", async (req, res) => {
  const mod = await moderator.findOne({ kerberos: req.params.kerberos });
  res.status(200).json({
    _id: mod._id,
    name: mod.name,
    kerberos: mod.kerberos,
  });
});

adminRouter.get("/mentor/view", async (req, res) => {
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
});

adminRouter.get("/mentor/view/:kerberos", async (req, res) => {
  const mentors = await mentor.findOne({ kerberos: req.params.kerberos });
  const queries = await query.find({ mentor: mentors._id});
  const opportunities = await opportunity.find({ creator: mentors._id});
  const attendances = await attendance.find({ mentor: mentors._id });

  res.status(200).json({
    _id: mentors._id,
    name: mentors.name,
    kerberos: mentors.kerberos,
    course: mentors.course,
    phone_number: mentors.phone_number,
    hours: mentors.hours,
    queries: queries.map((query) => {
      return {
        _id: query._id,
        title: query.title,
        description: query.description,
        attachments: query.attachments,
        status: query.status,
        feedback: query.feedback,
      };
    }),
    opportunities: opportunities.map((opportunity) => {
      return {
        _id: opportunity._id,
        title: opportunity.title,
        description: opportunity.description,
        attachments: opportunity.attachments,
        status: opportunity.status,
        feedback: opportunity.feedback,
      };
    }),
    attendance: attendances.map((attendance) => {
      return {
        _id: attendance._id,
        description: attendance.description,
        date: attendance.date,
        hours: attendance.hours,
      };
    }),
  });
});
adminRouter.get("/student/view", async (req, res) => {
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
});

adminRouter.get('/student/view/:kerberos', async (req, res) => {
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
        feedback: query.feedback,
      };
    }),
  });
})

export default adminRouter;
