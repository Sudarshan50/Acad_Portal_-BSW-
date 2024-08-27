import e from "express";
import Mentor from "../../models/mentor.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import checkAuth from "../../middleware/checkAuht.mjs";
import checkRole from "../../middleware/checkRole.mjs";

const router = e.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);
  const mentor = new Mentor({
    kerberos: req.body.kerberos,
    password: req.body.password,
    name: req.body.name,
    phone_number: req.body.phone_number,
    course: req.body.course,
    hours: req.body.hours,
  });
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    mentor.password = hashedPassword;
    await mentor.save();
    res.status(200).send(mentor);
  } catch (e) {
    console.log(e);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { kerberos, password } = req.body;
    const mentor = await Mentor.findOne({ kerberos });
    if (!mentor) {
      return res.status(400).json({ message: "Invalid kerberos or password" });
    }
    const isMatch = await bcrypt.compare(password, mentor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid kerberos or password" });
    }
    const token = jwt.sign(
      { id: mentor._id, role: mentor.role },
      process.env.APP_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token, mentor });
  } catch (err) {
    console.log(err);
  }
});
router.get(
  "/details/:kerberos",
  checkAuth,
  checkRole("mentor"),
  async (req, res) => {
    try {
      // console.log(req.params);
      const mentor = await Mentor.findOne({ kerberos: req.params.kerberos });
      if (!mentor) {
        res.status(400).send("Mentor not found");
        return;
      }
      return res.status(200).send(mentor);
    } catch (er) {
      return res.status(400).send(er);
    }
  }
);
router.post(
  "/change-password",
  checkAuth,
  checkRole("mentor"),
  async (req, res) => {
    try {
      const mentor = await Mentor.findOne({ kerberos: req.body.kerberos });
      if (!mentor) {
        res.status(400).send("Mentor not found");
        return;
      }
      const isMatch = await bcrypt.compare(
        req.body.oldPassword,
        mentor.password
      );
      if (!isMatch) {
        res.status(400).send("Old password is incorrect");
        return;
      }
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
      mentor.password = hashedPassword;
      await mentor.save();
      res.status(200).send(mentor);
    } catch (er) {
      console.log(er);
    }
  }
);
export default router;
