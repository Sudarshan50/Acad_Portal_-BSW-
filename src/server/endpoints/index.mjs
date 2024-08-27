import jwt from "jsonwebtoken";
import express from "express";
import Student from "../models/student.mjs";
import Token from "../models/token.mjs";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import dotenv from "dotenv";
import checkAuth from "../middleware/checkAuht.mjs";
import checkRole from "../middleware/checkRole.mjs";
dotenv.config();

const router = express.Router();
// const SECRET_KEY = "never-rely-on-secret-key-easy-to-hack";
//Authentication
//POST: /signup - Signup
router.post("/signup", async (req, res) => {
  const { kerberos, password, name, phone_number } = req.body;
  console.log(req.body);
  const existingStudent = await Student.findOne({ kerberos });
  if (existingStudent) {
    return res.status(400).json({ message: "Kerberos already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const student = new Student({
    kerberos,
    password: hashedPassword,
    name,
    phone_number,
  });
  await student.save();

  const token = jwt.sign({ id: student._id }, process.env.APP_SECRET, {
    expiresIn: "423423h",
  });
  const authToken = new Token({
    userId: student._id,
    token: crypto.randomBytes(16).toString("hex"),
  });
  await authToken.save();
  console.log(authToken);
  try {
    const link = `https://acadbackend-git-main-sudarshan50s-projects.vercel.app/api/verify/${authToken.token}`;
    await verifEmail(`${student.kerberos}@iitd.ac.in`, link); //
    res.status(200).json({
      message: "Please check your email to verify your account..",
      token,
    });
  } catch (err) {
    res.status(500).send({ message: "Error in sending email" });
    console.log(err);
  }
});

//POST: /login - Login
router.post("/login", async (req, res) => {
  const { kerberos, password } = req.body;

  const student = await Student.findOne({ kerberos });
  if (!student) {
    return res.status(400).json({ message: "Invalid kerberos or password" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, student.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid kerberos or password" });
  }
  if (student.verified === false) {
    const authToken = await Token.findOne({ userId: student._id });
    try {
      const link = `https://acadbackend-git-main-sudarshan50s-projects.vercel.app/api/verify/${authToken.token}`;
      await verifEmail(`${student.kerberos}@iitd.ac.in`, link);
      return res.status(200).json({
        message: "Please check your email to verify your account..",
        status: "unverified",
      });
    } catch (err) {
      return res.status(500).send({ message: "Error in sending email" });
    }
  }
  const token = jwt.sign(
    { id: student._id, role: student.role },
    process.env.APP_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.json({ message: "Logged in successfully", token, status: "verified" });
});

router.get("/verify/:token", async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token });
    if (!token) {
      return res.status(400).json({ message: "Invalid token" });
    }
    await Student.updateOne(
      { _id: token.userId },
      { $set: { verified: true } }
    );
    const temp = await Student.findOne({ _id: token.userId });
    await Token.deleteOne(token._id);
    res.redirect(
      "https://acadfrontend-git-main-sudarshan50s-projects.vercel.app/"
    );
  } catch (err) {
    console.log(err);
  }
});

// router.use((req,res,next)=>{
//   const token = req.headers['x-access-token'];
//   if (!token) {
//     return res.status(403).json({ message: 'No token provided' });
//   }
//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// })

import student_router from "./students/index.mjs";
router.use("/student", checkAuth, checkRole("student"), student_router);

import mentor_router from "./mentor/index.mjs";
router.use("/mentor", mentor_router);

import moderator_router from "./moderator/index.mjs";
import verifEmail from "./email_verif/emailverif.mjs";
router.use("/moderator", moderator_router);

export default router;
