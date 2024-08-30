import express from "express";
import Mentor from "../../models/mentor.mjs";
import Query from "../../models/query.mjs";

const queries_router = express.Router();

//POST: /mentor/queries/:id - Take a query
queries_router.post("/:id", async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ kerberos: req.body.kerberos });
    if (!mentor) {
      res.status(400).send("Mentor not found");
      return;
    }
    const query = await Query.findOne({
      _id: req.params.id,
      status: "AVAILABLE",
    });
    // console.log(query);
    if (!query) {
      res.status(400).send("Query not found");
      return;
    }
    // if(query.status!=='OPEN'){
    //     res.status(400).send("Query already taken");
    //     return;
    // }
    query.status = "TAKEN";
    query.mentor = mentor._id;
    query.taken_at = Date.now();
    query.mentor_name = mentor.name;
    await query.save();
    res.status(200).send(query);
  } catch (e) {
    res.status(500).send(e);
  }
});

//GET: /mentor/queries - Get all queries that are available
queries_router.get("/", async (req, res) => {
  try {
    const queries = await Query.find()
      .populate({
        path: "student",
        select: "name kerberos phone_number",
      })
      .populate({
        path: "last_action_moderator",
        select: "name kerberos",
      });
    res.status(200).send(queries);
  } catch (e) {
    res.status(500).send(e);
  }
});

queries_router.get("/taken/:kerberos", async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ kerberos: req.params.kerberos });
    if (!mentor) {
      res.status(400).send("Mentor not found");
      return;
    }
    const queries = await Query.find({ status: "TAKEN", mentor: mentor._id })
      .populate({
        path: "student",
        select: "name kerberos phone_number",
      }).populate({
        path: "last_action_moderator",
        select: "name kerberos",
      });
    res.status(200).send(queries);
    } catch (e) {
    res.status(500).send(e);
    }
});


queries_router.get("/avquery/:kerberos", async (req, res) => {
  try {
    const mentId = await Mentor.findOne({ kerberos: req.params.kerberos });
    if (!mentId) {
      res.status(400).send("Mentor not found");
      return;
    }
    const queries = await Query.find({ mentor: mentId._id })
      .populate({
        path: "student",
        select: "name kerberos phone_number",
      })
      .populate({
        path: "last_action_moderator",
        select: "name kerberos",
      });
    res.status(200).send(queries);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

export default queries_router;
