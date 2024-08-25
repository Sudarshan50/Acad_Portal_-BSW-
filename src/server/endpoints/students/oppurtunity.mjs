import e from "express";
import Opportunity from "../../models/opportunity.mjs";
import Mentor from "../../models/mentor.mjs";

const opportunitiesRouter = e.Router();

opportunitiesRouter.get("/:kerberos", async (req, res) => {
  try {
    const mod = await Opportunity.find({ kerberos: req.params.kerberos });
    if (!mod) {
      return res.status(400).send("Mentor not found");
    }
    const opportunities = await Opportunity.find().populate({
      path: "creator",
      select: "name",
    }).populate({
      path: "taker",
      select: "name",
    });
    res.status(200).send(opportunities);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

export default opportunitiesRouter;
