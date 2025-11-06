import express from 'express';
import dotenv from "dotenv";
import {login, register, me} from "../controller/auth.controller.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
dotenv.config();


const router = express.Router();


router.post('/login',login )
router.post('/register',register )
router.get('/me',authMiddleware,me)


export default router;