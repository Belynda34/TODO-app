import mongoose from "mongoose";
import Task from "../model/tasks.js";






export const createTask = async (req,res) => { 
    const task = req.body;
    if (!task.name){
        res.status(400).json({success:false,message:"Please fill in all fields"})
    }
    const newtask = new Task(task);
    try { 
        await newtask.save()
        res.status(201).json({success:true,data:newtask})
    }catch(error){
        console.error("Error in creating task:",error.message);
        res.status(500).json({success:false,message:"Server Error"})
    }
}


export const getTasks = async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({success:true,data:tasks})
    } catch (error) {
        console.error("Error in fetching tasks:",error.message);
        res.status(500).json({success:false,message:"Server Error"})
    }
}


export const updateTask = async (req,res) =>{
    const { id } = req.params;
        const task = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid id"})
    }
    try{
        const updatedTask = await Task.findByIdAndUpdate(id,task,{new:true})
        if (!updatedTask){
            res.status(404).json({success:false,message:"Task not found"})
        }
        res.status(200).json({success:true,data:updatedTask})
    }catch(error){
        console.error("Error in Updating task :",error.message);
        res.status(500).json({success:false,message:"Server Error"})
    }
}

export const deleteTask = async (req,res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false,message:"Invalid id"})
    }
    try{
        const deletedTask = await Task.findByIdAndDelete(id)
        if(!deletedTask){
            res.status(404).json({success:false,message:"Task not found"}) 
        }
        res.status(200).json({success:true,message:"Task Deleted"})
    }catch(error){
        console.error("Error deleting product:",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
}