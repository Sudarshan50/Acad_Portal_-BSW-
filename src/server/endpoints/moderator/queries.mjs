import express from "express";
import Query from "../../models/query.mjs";
import Moderator from "../../models/moderator.mjs";
// import Mentor from '../../models/mentor.jsx';
const router = express.Router();

router.get("/:kerberos", async (req, res) => {
  try {
    const mod = await Moderator.findOne({ kerberos: req.params.kerberos });
    if (!mod) {
      return res.status(400).send("Moderator not found");
    }
    const queries = await Query.find()
      .populate({
        path: "mentor",
        select: "name kerberos",
      })
      .populate({
        path: "last_action_moderator",
        select: "name kerberos",
      }).populate({
        path: 'student',
        select: 'name kerberos'
      });
    res.status(200).send(queries);
  } catch (err) {
    console.log(err);
  }
});

//POST: /dismiss/:id - Dismiss a query
router.post("/dismiss/:id", async (req, res) => {
  try {
    const moderator = await Moderator.findOne({ kerberos: req.body.kerberos });
    if (!moderator) {
      res.status(400).send("Moderator not found");
      return;
    }
    const query = await Query.findOne({ _id: req.params.id });
    if (!query) {
      res.status(400).send("Query not found");
      return;
    }
    if (query.status !== "QUEUED") {
      res.status(400).send("Query already dismissed or taken");
      return;
    }
    query.status = "DISMISSED";
    query.last_action_moderator = moderator._id;
    await query.save();
    res.status(200).send(query);
  } catch (e) {
    res.status(500).send(e);
  }
});

//POST: /Make available/:id - Make a query available
router.post("/make_available/:id", async (req, res) => {
  try {
    const moderator = await Moderator.findOne({ kerberos: req.body.kerberos });
    console.log(moderator);
    if (!moderator) {
      res.status(400).send("Moderator not found");
      return;
    }
    const query = await Query.findOne({ _id: req.params.id });
    if (!query) {
      res.status(400).send("Query not found");
      return;
    }
    if (query.status == "DISMISSED" && query.status == "AVAILABLE") {
      res.status(400).send("Query already available");
      return;
    }
    query.status = "AVAILABLE";
    query.last_action_moderator = moderator._id;
    await query.save();
    res.status(200).send(query);
  } catch (e) {
    res.status(500).send(e);
  }
});

//POST: /reject_resolve/:id - Reject a query
router.post("/reject_resolve/:id", async (req, res) => {
  try {
    const moderator = await Moderator.findOne({ kerberos: req.body.kerberos });
    if (!moderator) {
      res.status(400).send("Moderator not found");
      return;
    }
    const query = await Query.findOne({ _id: req.params.id }).populate(
      "mentor"
    );
    if (!query) {
      res.status(400).send("Query not found");
      return;
    }
    if (
      query.status == "QUEUED" ||
      query.status == "DISMISSED" ||
      query.status == "TAKEN" ||
      query.status == "AVAILABLE"
    ) {
      res.status(400).send("Query not yet resolved");
      return;
    }
    query.status = "REJECTED";
    query.last_action_moderator = moderator._id;
    await query.save();
    query.mentor.hours -= query.hours;
    await query.mentor.save();
    res.status(200).send(query);
  } catch (e) {
    res.status(500).send(e);
  }
});

//POST: /approve_resolve/:id - Approve a query
router.post("/approve_resolve/:id", async (req, res) => {
  try {
    const moderator = await Moderator.findOne({ kerberos: req.body.kerberos });
    if (!moderator) {
      res.status(400).send("Moderator not found");
      return;
    }
    const query = await Query.findOne({ _id: req.params.id }).populate(
      "mentor"
    );
    if (!query) {
      res.status(400).send("Query not found");
      return;
    }
    if (
      query.status == "QUEUED" ||
      query.status == "DISMISSED" ||
      query.status == "TAKEN" ||
      query.status == "AVAILABLE"
    ) {
      res.status(400).send("Query not yet resolved");
      return;
    }
    if (!req.body.hours || isNaN(req.body.hours)) {
      res.status(400).send("Invalid hours provided");
      return;
    }
    query.hours = Number(req.body.hours);
    query.status = "APPROVED";
    query.last_action_moderator = moderator._id;
    await query.save();
    query.mentor.hours += Number(req.body.hours);
    await query.mentor.save();
    res.status(200).send(query);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
