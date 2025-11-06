import express from 'express';
import {
    createProject,
    deleteProject,
    getAllProjects,
    getProjectById,
    updateProject
} from '../controller/project.controller.js';
import {adminMiddleware, authMiddleware} from "../middleware/authMiddleware.js";
import {createSubtask} from "../controller/subtask.controller.js";


const router = express.Router();

router.get('/',authMiddleware,getAllProjects);
router.post('/', authMiddleware,adminMiddleware,createProject);


router.patch('/:id', authMiddleware,adminMiddleware,updateProject);
router.delete('/:id', authMiddleware,adminMiddleware,deleteProject);

router.get('/:id', authMiddleware,getProjectById);

// Get all subtasks
router.post('/:id/subtask', authMiddleware,adminMiddleware,createSubtask);


export default router;