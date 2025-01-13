import React, { useState } from 'react'
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { useTaskStore } from '../api/task';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";



const Card = ({task}) => {


  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteTask,updateTask } = useTaskStore();

  const [updatedTask,setUpdatedTask] = useState(task)
   


  

  const handleDeleteTask = async (id) => {
    const result = await deleteTask(id)
    if (result.success) { 
      console.log("Task deleted")
      set((state) => ({
        task: state.tasks.filter((task) => task._id !== id),
      }));
    }else{
      alert(result.message)
    }
   
  }
  
  const handleUpdateTask = async (id,updatedTask) => { 
      const result = await updateTask(id,updatedTask)
      if(result.success){
        onClose()
        console.log("Task updated:",result.data)
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
      <div className='flex items-center' onClick={onOpen}>
          <FaPen className='text-xl text-gray-300 cursor-pointer'/>
          <MdDelete className='text-2xl text-gray-300 cursor-pointer' onClick={() => handleDeleteTask(task._id)}/>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={28}
            fontWeight={"bold"}
            className=" font-extrabold text-center"
          >
            UPDATE NOTE
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              name='name'
              value={updatedTask.name}
              onChange={(e)=> setUpdatedTask({...updatedTask,name:e.target.value})}
              placeholder="Input your note..."
              className={`w-[25rem] pl-3 p-2 rounded-lg border-2 ${
              useColorMode === "light" ? "border-violet-600" : "border-white"
              }`}
            />
          </ModalBody>
          <ModalFooter mt={40}>
            <button className="w-[7rem] h-10 border-[2px] border-violet-600 text-violet-600 font-semibold rounded-xl mr-44" onClick={onClose}>
              CANCEL
            </button>
            <button className="w-[7rem] h-10 bg-violet-600 rounded-xl text-white font-semibold" onClick={()=> handleUpdateTask(task._id,updatedTask)} >
              Update
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        
    </div>
  )
}

export default Card