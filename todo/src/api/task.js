import { create } from "zustand";
import { getTasks } from "../services/taskService";

export const useTaskStore = create((set) => ({
    tasks : [],

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
            console.error('Error fetching tasks:', error);
        }
    },
    

}))