import express from "express";
import {codeSubmission, getAllSubmissions, reviewSubmission} from "../controller/submission.controller.js";
import {adminMiddleware, authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/",authMiddleware,adminMiddleware, )

router.get("/:assignmentId",authMiddleware, getAllSubmissions)

router.post("/code",authMiddleware, codeSubmission)

router.patch("/review/:submissionId", authMiddleware, adminMiddleware, reviewSubmission);


export default router;