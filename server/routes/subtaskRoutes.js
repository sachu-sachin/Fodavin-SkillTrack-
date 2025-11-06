import express from 'express';
import {deleteSubtask, updateSubtask} from "../controller/subtask.controller.js";

const router = express.Router()

router.patch('/:id', updateSubtask)
router.delete('/:id', deleteSubtask)

export default router;