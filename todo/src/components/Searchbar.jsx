import React from 'react'
import { FaSearch } from "react-icons/fa";
import { useColorMode } from '@chakra-ui/react';

const Searchbar = () => {
    const {colorMode} =useColorMode()
  return (
    <div>
        <div className=''>
            <input type='text' placeholder='Search note...'  className={`w-[50rem] text-xl  pl-6 p-2 border-2 rounded-lg ${ colorMode === 'light' ? 'border-violet-500' : 'border-gray-600' } transition duration-200`} />
            <button className='text-2xl relative right-10 top-1'><FaSearch/></button>
        </div>
    </div>
  )
}
//  className={`w-[50rem] text-xl  p-2 border-2 rounded-lg ${ colorMode === 'light' ? 'border-gray-300' : 'border-gray-600' } transition duration-200`}
export default Searchbar;