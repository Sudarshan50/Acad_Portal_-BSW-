import express from "express";
const router = express.Router();

import checkAuth from "../../middleware/checkAuht.mjs";
import checkRole from "../../middleware/checkRole.mjs";

import auth_router from "./auht.mjs";
router.use("/auth", auth_router);
import adminRouter from "./admin/adminRoutes.mjs";
router.use("/admin", checkAuth, checkRole("mod"), adminRouter);
import queries_router from "./queries.mjs";
router.use("/queries", checkAuth, checkRole("mod"), queries_router);
import attendance_router from "./attendance.mjs";
router.use("/attendance", checkAuth, checkRole("mod"), attendance_router);
import opportunitiesRouter from "../students/oppurtunity.mjs";
router.use("/opportunities", checkAuth, checkRole("mod"), opportunitiesRouter);

export default router;
