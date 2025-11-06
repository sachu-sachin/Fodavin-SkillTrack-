import Assignments from "../models/Assignment.js";

export const createAssignments = async (req, res) => {
    try {
        const { learnerId, projectId } = req.body;

        const assignment = await Assignments.create({ learnerId, projectId });

        return res.status(201).json({
            message: `Project ${projectId} successfully assigned to learner ${learnerId}`,
            data: assignment, // Include assignment details
        });
    } catch (err) {
        console.error(err); // It's a good practice to log errors for debugging
        return res.status(500).json({
            message: 'Something went wrong while creating the assignment',
            error: err.message,
        });
    }
};


export const getAssignedAssignments = async (req, res) => {
    try {
        const learnerId = req.params.id;

        const all_Assignments = await Assignments.find({ learnerId },"-_id -__v");

        if (!all_Assignments || all_Assignments.length === 0) {
            return res.status(404).json({ message: `No assignments found for learner ${learnerId}` });
        }

        return res.status(200).json({
            message: `Assignments fetched successfully for learner ${learnerId}`,
            data: all_Assignments,
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};

export const updateAssignmentStatus = async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const { status } = req.body;

        if (!["pending", "in-progress", "completed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const assignment = await Assignments.findByIdAndUpdate(
            assignmentId,
            { status },
            { new: true, runValidators: true }
        );

        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        return res.status(200).json({ message: 'Assignment status updated', data: assignment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating assignment status', error: error.message });
    }
};