import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    learnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    assigned_at: { type: Date, default: Date.now },
    status: { type: String, enum: ["in-progress","completed"], default: "in-progress" },
    completedSubtasks: [{ type: mongoose.Schema.Types.ObjectId }]
}, { timestamps: true });

assignmentSchema.index({ learnerId: 1, projectId: 1 });

export default mongoose.model("Assignment", assignmentSchema);