import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    title: String,
    description: String,
    hint: String,
    designUrl: String,
    order: Number,
    framework: { type: String, enum: ["vanilla","react","none"], default: "react" },
    defaultFiles: [{
        language: { type: String }, fileName: String, code: String
    }],
    expectedOutput: String,
}, { timestamps: true });

export default mongoose.model("Subtask", subtaskSchema);
