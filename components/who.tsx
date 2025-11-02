import React from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa';

const Who = () => {
  return (
    <div className='mt-40 mx-10 '>
      <h1 className='text-black  font-black text-4xl  '>Who are you shopping for?</h1>
      <div className='grid grid-cols-3 mt-10 '>
        <div className='bg-[url(/men.jpg)] bg-cover bg-center w-[98%] h-100 flex items-center justify-center'>
        <div className='bg-white border-2 border-black p-3 gap-7 w-60 font-bold text-xl flex items-center justify-center mt-50 '>
         <p><Link href="/"> MEN   </Link></p>
         <FaArrowRight />
        </div>
        
        </div>
        
        <div className='bg-[url(/best.png)] bg-cover bg-center w-[98%] h-100 flex items-center justify-center'>
        <div className='bg-white border-2 border-black p-3 gap-7 w-60 font-bold text-xl flex items-center justify-center mt-50 '>
         <p><Link href="/"> WOMEN  </Link></p>
         <FaArrowRight />
        </div>
        
        </div>

        <div className='bg-[url(/MADDOX.jpg)] bg-cover bg-center w-[98%] h-100 flex items-center justify-center'>
        <div className='bg-white border-2 border-black p-3 gap-7 w-60 font-bold text-xl flex items-center justify-center mt-50 '>
         <p><Link href="/"> KIDS </Link></p>
            <FaArrowRight />
         
        </div>
        
        </div>
      </div>
      
    </div>
  )
}

export default Who