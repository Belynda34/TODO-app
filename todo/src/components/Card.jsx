import React from 'react'
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const Card = () => {
  return (
    <div className='flex items-center justify-between w-[40rem] py-2 border-b-2 border-b-violet-900 '>
      <div className='flex gap-4'>
        <MdCheckBoxOutlineBlank className='text-3xl cursor-pointer'/>
        <h1 className='text-xl'>NOTE #1</h1>
      </div>
      <div className='flex items-center'>
          <FaPen className='text-xl text-gray-300 cursor-pointer'/>
          <MdDelete className='text-2xl text-gray-300 cursor-pointer'/>
      </div>
        
    </div>
  )
}

export default Card