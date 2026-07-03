import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import booksRouter from "./books";
import academySessionsRouter from "./academy-sessions";
import enrollmentsRouter from "./enrollments";
import membersRouter from "./members";
import siteRouter from "./site";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(booksRouter);
router.use(academySessionsRouter);
router.use(enrollmentsRouter);
router.use(membersRouter);
router.use(siteRouter);

export default router;
