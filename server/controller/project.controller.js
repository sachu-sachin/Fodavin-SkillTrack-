import Project from "../models/Project.js";

// Create a new project (admin only)
export const createProject = async (req, res) => {
    try {
        const { title, description, topics, framework, designUrl, instructions } = req.body;

        const project = await Project.create({ title, description, topics, framework, designUrl, instructions });

        res.status(200).send({ message: 'Project created', project });
    } catch (error) {
        res.status(500).send({ message: 'Error creating project', error: error.message });
    }
};

// Get all projects (minimal data for listing)
export const getAllProjects = async (req, res) => {
    try {
        // Only select fields needed for listing
        const projects = await Project.find({}, 'title topics framework');

        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'No projects found' });
        }

        return res.status(200).send({ message: 'Projects found', projects });
    } catch (err) {
        return res.status(500).send({ message: 'Error fetching projects', error: err.message });
    }
};

// Get project by ID (full details)
export const getProjectById = async (req, res) => {
    try {
        const projectID = req.params.id;

        const project = await Project.findById(projectID).populate('subtasks');

        if (!project) {
            return res.status(404).json({ message: `No project found with ID: ${projectID}` });
        }
        return res.status(200).send({ message: 'Project found', project });
    } catch (err) {
        return res.status(500).send({ message: 'Error fetching project', error: err.message });
    }
};

// Update a project (admin only)
export const updateProject = async (req, res) => {
    try {
        const projectID = req.params.id;
        const updateData = req.body;

        const updatedProject = await Project.findByIdAndUpdate(projectID, updateData, { new: true, runValidators: true }); // get new doc, schema check

        if (!updatedProject) {
            return res.status(404).json({ message: `No project found with ID: ${projectID}` });
        }

        return res.status(200).send({ message: 'Project updated', project: updatedProject });
    } catch (err) {
        return res.status(500).send({ message: 'Error updating project', error: err.message });
    }
};

// Delete a project (admin only)
export const deleteProject = async (req, res) => {
    try {
        const projectID = req.params.id;

        const deletedProject = await Project.findByIdAndDelete(projectID);

        if (!deletedProject) {
            return res.status(404).json({ message: `No project found with ID: ${projectID}` });
        }

        return res.status(200).send({ message: 'Project deleted successfully', project: deletedProject });
    } catch (err) {
        return res.status(500).send({ message: 'Error deleting project', error: err.message });
    }
};
