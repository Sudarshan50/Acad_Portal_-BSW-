import express from "express";
import checkAuth from "../../middleware/checkAuht.mjs";
import checkRole from "../../middleware/checkRole.mjs";

const mentor_router = express.Router();
import auth_router from "./auth.mjs";
mentor_router.use("/auth", auth_router);
import adminMentRouter from "./admin/AdminRoutes.mjs";
mentor_router.use("/admin", checkAuth, checkRole("mentor"), adminMentRouter);
import queries_router from "./queries.mjs";
mentor_router.use("/queries", checkAuth, checkRole("mentor"), queries_router);
import opportunity_router from "./opportunity.mjs";
mentor_router.use(
  "/opportunity",
  checkAuth,
  checkRole("mentor"),
  opportunity_router
);
import attendance_router from "./attendance.mjs";
mentor_router.use(
  "/attendance",
  checkAuth,
  checkRole("mentor"),
  attendance_router
);
export default mentor_router;
