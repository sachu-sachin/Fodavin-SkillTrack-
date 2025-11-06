import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    topics: [String], // good for filtering/search
    framework: { type: String, enum: ["vanilla","react","none"], default: "vanilla" },
    designUrl: String,
    instructions: String,
    subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subtask" }]
}, { timestamps: true });

// text index for search
projectSchema.index({ title: "text", topics: "text" });

export default mongoose.model("Project", projectSchema);
