import { create } from "zustand";
import { getTasks,addTask, removeTask } from "../services/taskService";


export const useTaskStore = create((set) => ({
    tasks: [],
    setTasks: (newTasks) => set({ tasks: newTasks }),
   
    fetchTasks: async () => {
      try {
        const result = await getTasks();
        if (result.success) {
          set({ tasks: result.data || [] });
          console.log("Fetched tasks:", result.data);
        } else {
          console.log("Failed to fetch tasks:", result.message);
        }
      } catch (error) {
            console.error("Error fetching tasks:",error);
      }
    },
  
    createTask: async (newTask) => {
      if (!newTask.name) {
        return { success: false, message: "Please fill in the field" };
      }
      try {
        const result = await addTask(newTask);
        if (result.success) {
          set((state) => ({ tasks: [...state.tasks, result.data] }));
          console.log("Task created:", result.data);
          return { success: true, message: "Task created successfully" };
        } else {
          console.error("Failed to create Task:", result.message);
          return { success: false, message: result.message };
        }
      } catch (error) {
        console.error("Error in creating task:", error);
        return {
          success: false,
          message: "An error occurred while creating the task",
        };
      }
    },

    deleteTask : async (id) => {
        try {
            const result = await removeTask(id)
            if (result.success) { 
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== id),  // Remove the task from state
                  }));
                return {success:true, message: "Task deleted successfully"}
            }else{
                return { succes:false,message:result.message}
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            return { success: false, message: "An error occurred while deleting the task" };
        }
    }
  }));
  