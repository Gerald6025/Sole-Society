import React from 'react'
import Image from 'next/image'

const By = () => {
  return (
    <div className='-mt-40 grid grid-cols-2 mx-10'>
        <div className='flex flex-col justify-center gap-4'>
  <h1 className='font-semibold text-lg'>Create Your Design</h1>
  <h1 className='text-5xl font-black'>NIKE AIR JORDAN 1 BY YOU</h1>
  <h1 className='font-semibold text-lg'>Take advantage of brand new, proprietary  cushioning technology with a fresh pair of Nike Jordan 1 shoes.</h1>
    <span className=" bg-black text-white px-5 py-3 rounded-md font-medium hover:bg-gray-900 transition w-[140px] inline-flex items-center justify-center">
                Create
              </span>
        </div>


        <div>
       <Image src="/AIRt.png" alt="nikey" width={800} height={800}/>
        </div>
      
    </div>
  )
}

export default By
