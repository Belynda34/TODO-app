

import axios from "axios";


const api_url = "http://localhost:5000/api/task";


export const getTasks = async () =>{
    const response = await axios.get(`${api_url}`)
    return response.data
};

export const createTask = async () =>{
    const response = await axios.post(`${api_url}/create`)
    return response.data
};

export const updateTask = async (id,updatedTask) => {
    const response = await axios.put(`${api_url}/${id}`,updatedTask)
    return response.data
};

export const deleteTask = async (id) =>{
    const response = await axios.delete(`${api_url}/${id}`)
    return response.data
};