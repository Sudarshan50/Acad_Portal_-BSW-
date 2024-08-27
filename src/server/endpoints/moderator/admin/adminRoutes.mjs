import e from "express";
import moderator from "../../../models/moderator.mjs";
import mentor from "../../../models/mentor.mjs";

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
adminRouter.get("/mod/view/:id", async (req, res) => {
  const mod = await moderator.findById(req.params.id);
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
      };
    }),
  });
});

adminRouter.get("/mentor/view/:id", async (req, res) => {
  const mentors = await mentor.findById(req.params.id);
  res.status(200).json({
    _id: mentors._id,
    name: mentors.name,
    kerberos: mentors.kerberos,
    course: mentors.course,
    phone_number: mentors.phone_number,
    hours: mentors.hours,
  });
});

export default adminRouter;
