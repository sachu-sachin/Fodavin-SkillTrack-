import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
    learnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" ,required: true},
    subtaskId: { type: mongoose.Schema.Types.ObjectId, ref: "Subtask" ,required: true},
    fileUrl: String,
    submittedFiles: [{
        fileName: String,
        language: String,
        code: String
    }],
    status: { type: String, enum: ["submitted", "reviewed"], default: "submitted" },
    feedback: String,
    submitted_at: { type: Date, default: Date.now },
    reviewed_at: Date,
    score: Number
}, { timestamps: true });

submissionSchema.index({ assignmentId: 1, learnerId: 1 });

export default mongoose.model("Submission", submissionSchema);
