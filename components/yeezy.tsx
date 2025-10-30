import React from 'react'
import Link from 'next/link'

const Yeezy = () => {
  return (
   <Link href='/'>
    <div className='bg-[url(/kan.png)]  bg-[#00000048] bg-blend-overlay rounded-md  bg-cover bg-center h-[600px] w-[95%] left-[2.5%] right-[2.5%] relative  mt-30'>
       <div className='flex flex-col gap-3 pl-5 pt-95'>
       <h1 className='text-7xl text-white font-black '>Adidas Yeezy</h1>
       <h1 className='text-xl text-white font-semibold '>Rock the Great Kanye West Collection</h1>
       
           <span className=" bg-black text-white px-5 py-3 rounded-md font-medium hover:bg-gray-900 transition w-[140px] inline-flex items-center justify-center">
             Shop now →
           </span>
       </div>
    </div>
    </Link>
    
  )
}

export default Yeezy
