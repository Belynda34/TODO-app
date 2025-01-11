import axios from "axios";
// import { create } from "zustand";

const api_url = "http://localhost:5000/api/tasks";

export const getTasks = async () => {
  const response = await axios.get(`${api_url}`);
  return response.data;
};

export const addTask = async (task) => {
  try {
    const response = await axios.post(`${api_url}/create`, task);
    if (response.status == 201) {
      return { success: true, data: response.data };
    } else {
      return { 
        success: false,
        message: "Failed to create task" };
    }
  } catch (error) {
    console.error("Error in creating task:", error);
    return {
      success: false,
      message: "Failed to create task due to server error ",
    };
  }
};

export const updateTask = async (id, updatedTask) => {
  const response = await axios.put(`${api_url}/${id}`, updatedTask);
  return response.data;
};

export const removeTask = async (id) => {
    try {
        const response = await axios.delete(`${api_url}/${id}`);
        console.log("Task deleted:",response.data)
        return { success: true, message: 'Task deleted successfully', data: response.data };   
    } catch (error) {
        console.error("Error in deleting task",error)
        return { success:false,message:"Failed to create task due to server error",error: error.message}
    }
  
};


