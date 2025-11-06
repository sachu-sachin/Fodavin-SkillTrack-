import express from 'express';
import {
    createAssignments,
    getAssignedAssignments,
    updateAssignmentStatus
} from "../controller/assignment.controller.js";
import {adminMiddleware, authMiddleware} from "../middleware/authMiddleware.js";
const router = express.Router()

router.get('/:id', authMiddleware,getAssignedAssignments);
router.post('/',authMiddleware,adminMiddleware,createAssignments)
router.patch('/:id', authMiddleware,updateAssignmentStatus)

export default router;