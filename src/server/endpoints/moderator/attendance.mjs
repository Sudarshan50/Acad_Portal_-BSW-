import express from "express";
import Moderator from "../../models/moderator.mjs";
import Attendance from "../../models/attendance.mjs";

const router = express.Router();

//GET: get all attendance
router.get("/:kerberos", async (req, res) => {
  try {
    const moderator = await Moderator.findOne({
      kerberos: req.params.kerberos,
    });
    if (!moderator) {
      res.status(400).send("Moderator not found");
      return;
    }
    const attendances = await Attendance.find().populate({
      path: "mentor",
      select: "name",
    }).populate({
      path: "last_action_moderator",
      select: "name",
    }).populate({
      path: "approved_by",
      select: "name",
    }).populate({
      path: "disapproved_by",
      select: "name",
    });
    res.status(200).send(attendances);
  } catch (e) {
    res.status(500).send;
  }
});

//PUT: approves the attendance
router.post("/approve/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ _id: req.params.id });
    const moderator = await Moderator.findOne({ kerberos: req.body.kerberos });
    // console.log(moderator);
    console.log(req.body);
    if (!moderator) {
      res.status(400).send("Moderator not found");
      return;
    }
    if (!attendance) {
      res.status(400).send("Attendance not found");
      return;
    }
    attendance.status = "APPROVED";
    attendance.approved_by = moderator._id;
    attendance.last_action_moderator = moderator._id;
    attendance.hours = req.body.hours;
    await attendance.save();
    res.status(200).send(attendance);
  } catch (e) {
    res.status(500).send(e);
  }
});

//PUT: disapproves the attendance
router.post("/disapprove/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ _id: req.params.id });
    const moderator = await Moderator.findOne({ kerberos: req.body.kerberos });
    if (!moderator) {
      res.status(400).send("Moderator not found");
      return;
    }
    if (!attendance) {
      res.status(400).send("Attendance not found");
      return;
    }
    attendance.disapproved_by = moderator._id;
    attendance.hours = 0;
    attendance.last_action_moderator = moderator._id;
    attendance.status = "DISAPPROVED";
    await attendance.save();
    res.status(200).send(attendance);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
