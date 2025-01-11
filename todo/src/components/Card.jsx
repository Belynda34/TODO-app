import React from 'react'
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { useTaskStore } from '../api/task';

const Card = ({task}) => {


  const { deleteTask,setTasks } = useTaskStore();
   
  const handleDeleteTask = async (id) => {
    const result = await deleteTask(id)
    if (result.success) { 
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      console.log("Task deleted")
    }else{
      alert(result.message)
    }
  } 

  return (
    <div className='flex items-center justify-between w-[40rem] py-2 border-b-2 border-b-violet-900 '>
      <div className='flex gap-4'>
        <MdCheckBoxOutlineBlank className='text-3xl cursor-pointer'/>
        <h1 className='text-xl'>{task.name}</h1>
      </div>
      <div className='flex items-center'>
          <FaPen className='text-xl text-gray-300 cursor-pointer'/>
          <MdDelete className='text-2xl text-gray-300 cursor-pointer' onClick={() => handleDeleteTask(task._id)}/>
      </div>
        
    </div>
  )
}

export default Card