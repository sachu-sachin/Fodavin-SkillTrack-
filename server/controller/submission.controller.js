// import Assignments from "../models/Assignment.js";
import Submission from "../models/Submission.js";
import Assignments from "../models/Assignment.js";


export const getAllSubmissions = async (req, res) => {
    try {

        const { assignmentId } = req.params;
        const user = req.user;

        const submissions = await Submission.find({assignmentId})
            .populate("subtaskId", "title order")
            .sort({ createdAt: -1 });

        res.status(200).json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const codeSubmission = async (req, res) => {
    try {
        const { learnerId, projectId, subtaskId, submittedFiles } = req.body;

        // Basic validation
        if (!learnerId || !subtaskId || !Array.isArray(submittedFiles)) {
            return res.status(400).json({ message: "Missing required fields or invalid data format" });
        }

        // Optional: Check that assignment exists (safety check)
        const assignment = await Assignments.findOne({learnerId:learnerId,projectId:projectId});
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        const assignmentId = assignment._id;

        // Check if a submission for this subtask already exists
        let submission = await Submission.findOne({ assignmentId, learnerId, subtaskId });

        if (submission) {
            // Update existing submission (overwrite files, reset status)
            submission.submittedFiles = submittedFiles;
            submission.status = "submitted";
            submission.feedback = "";
            submission.submitted_at = new Date();
            await submission.save();

            return res.status(200).json({
                message: "Submission updated successfully",
                submission,
            });
        }

        // Otherwise create a new submission
        submission = new Submission({
            assignmentId,
            learnerId,
            projectId,
            subtaskId,
            submittedFiles,
            status: "submitted",
            submitted_at: new Date(),
        });

        await submission.save();

        res.status(201).json({
            message: "Code submitted successfully",
            submission,
        });
    } catch (error) {
        console.error("Error submitting code:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const reviewSubmission = async (req, res) => {
    try {
        const { submissionId } = req.params;
        const { feedback, score } = req.body;
        const user = req.user;

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const submission = await Submission.findById(submissionId);
        if (!submission) return res.status(404).json({ message: "Submission not found" });

        submission.feedback = feedback;
        submission.score = score;
        submission.status = "reviewed";
        submission.reviewed_at = new Date();
        await submission.save();

        res.status(200).json({ message: "Submission reviewed", submission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

