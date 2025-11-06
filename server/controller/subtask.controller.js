import Project from "../models/Project.js";
import Subtask from "../models/Subtask.js";


export const createSubtask = async (req, res) => {
    try{
        const projectId = req.params.id;
        const subtaskData = req.body;

        const project = await Project.findById(projectId);
        const subtask = await Subtask.create({...subtaskData,projectId});
         project.subtasks.push(subtask._id);
         await project.save()
        return res.status(200).send({ message: `subtask created on this project ${projectId}`, data:project });
    }catch (error){
        res.status(400).send({error: error.message});
    }

};

export const updateSubtask = async (req, res) => {
    try{
        const subtaskId = req.params.id;
        const subtaskData = req.body;

        const subtask = await Subtask.findByIdAndUpdate(subtaskId,subtaskData,{new:true, runValidators:true})
        if(!subtask){
            return res.status(400).send({error: "Subtask not found"});
        }

        return res.status(200).send({message:"subtask updated successfully",data:subtask});
    }catch (error){
        res.status(400).send({error: error.message});
    }
};


export const deleteSubtask = async (req, res) => {
    try{
        const subtaskId = req.params.id;

        const subtask = await Subtask.findByIdAndDelete(subtaskId);
        if(!subtask){
            return res.status(400).send({error: "Subtask not found"});
        }

        await Project.findByIdAndUpdate(subtask.projectId, {
            $pull: { subtasks: subtaskId },
        });

        return res.status(200).send({message:"Subtask deleted and reference removed from project",data:subtask});
    }catch (error){
        res.status(400).send({error: error.message});
    }
};