import e from "express";
import bcrypt from "bcryptjs";
import Moderator from "../../models/moderator.mjs";
import jwt from "jsonwebtoken";

const router = e.Router();

router.post("/register", async (req, res) => {
  const { kerberos, password, name } = req.body;
  const newMod = new Moderator({
    kerberos: kerberos,
    password: password,
    name: name,
  });
  try {
    const hashpass = await bcrypt.hash(password, 10);
    newMod.password = hashpass;
    await newMod.save();
    return res.status(200).send(newMod);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { kerberos, password } = req.body;
    const mod = await Moderator.findOne({ kerberos });
    if (!mod) {
      return res.status(400).json({ message: "User Not Found.." });
    }
    const isMatch = await bcrypt.compare(password, mod.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid kerberos or password" });
    }
    const token = jwt.sign(
      { id: mod._id, role: mod.role },
      process.env.APP_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ token, mod });
  } catch (err) {
    console.log(err);
  }
});
export default router;
