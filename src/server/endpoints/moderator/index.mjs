import express from 'express';
const router = express.Router();

import auth_router from "./auht.mjs"
router.use('/auth',auth_router);
import queries_router from './queries.mjs';
router.use('/queries', queries_router);
import attendance_router from './attendance.mjs';
router.use('/attendance', attendance_router);

export default router;
