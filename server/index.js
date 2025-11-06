import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import subtaskRoutes from "./routes/subtaskRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";

const app = express();
dotenv.config();

connectDB();

app.use(express.json())
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/project",projectRoutes);
app.use("/api/subtask",subtaskRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submission", submissionRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{console.log('Server is running on port 5000...')});
