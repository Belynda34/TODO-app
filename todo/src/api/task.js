import { create } from "zustand";

import axios from "axios";

export const useTaskStore = create((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),

  fetchTasks: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      const result = response.data;

      if (result.success) {
        set({ tasks: result.data || [] });
        console.log("Fetched tasks:", result.data);
        return { success: true, message: "Tasks fetched successfully" };
      } else {
        return { success: false, message: "Failed to fetch tasks" };
      }
    } catch (error) {
        console.error("Error in fetching tasks",error)
        return { success:false,message: "Internal server Error"}
    }
  },

  createTask: async (newTask) => {
    if(!newTask.name) {
      return { success:false,message:"Please fill in field "}
    }
    try {
      const response = await axios.post('http://localhost:5000/api/tasks/create',newTask)
      const result = response.data

      if(result.success){
          set((state) => ({tasks: [...state.tasks,result.data]}))
          console.log("New task added:",result.data)
          return{ success : true , message:"Task created successfully"}
      }else{
          return { success:false,message:"Failed to create task "}
      }
    } catch (error) {
      console.log("Error in creating task:",error)
      return { success:false,message:"Internal server error "}
    }
  },

  deleteTask: async (id) => {

    try {
      const response = await axios.delete(`http://localhost:5000/api/delete/tasks/${id}`)
      const result = response.data
      if (result.success){
        set((state) => ({
          tasks: state.tasks.filter((task) => task._id !== id),
        }));
        console.log("Task deleted:",id)
        return { success:true,message:"Task deleted successfully"}
      }else{
        return { success:false,message:"Failed to deleted task"}
      }
    } catch (error) {
      console.error("Error in deleting task:",error)
      return { success:false,message:"Internal server error"}
    }

  },

   updateTask: async (id,updatedTask) => { 

    try {
      const  response  = await axios.put(`http://localhost:5000/api/tasks/${id}`,updatedTask)
      const result = response.data
      if(result.success){
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === id ? result.data : task
          ),
        }));
        console.log("Updated Task:",result.data)
        return{ success : true , message:"Task updated successfully"}
    }else{
        return { success:false,message:"Failed to update task "}
    }
    } catch (error) {
      console.log("Error in updating task:",error)
      return { success:false,message:"Internal server error "}
    }
     

    
  }
}));
