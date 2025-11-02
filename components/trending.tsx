import React from 'react'
import Link from 'next/link'

const Trending = () => {
  return (
    <div className='mt-20  '>
      <h1 className='text-black  font-black text-4xl pl-8 relative top-20'>Trending Now</h1>

      <div>
        <Link href='/'>
          <div className='bg-[url(/Nike.jpeg)]  bg-[#00000048] bg-blend-overlay rounded-md  bg-cover bg-center h-[600px] w-[95%] left-[2.5%] right-[2.5%] relative  mt-30'>
            <div className='flex flex-col gap-3 pl-5 pt-95'>
              <h1 className='text-7xl text-white font-black '>Nike Air Jordan 1</h1>
              <h1 className='text-xl text-white font-semibold '>One step in, and you’re already legendary</h1>

              <span className=" bg-black text-white px-5 py-3 rounded-md font-medium hover:bg-gray-900 transition w-[140px] inline-flex items-center justify-center">
                Shop now →
              </span>
            </div>
          </div>
        </Link>

        <div className='grid grid-cols-2 -mt-25 mx-5'>
          <Link href='/'>
            <div className='bg-[url(/cor.png)]  bg-[#00000048] bg-blend-overlay rounded-md  bg-cover bg-center h-[500px] w-[95%] left-[2.5%] right-[2.5%] relative  mt-30'>
              <div className='flex flex-col gap-1 pl-5 pt-95'>

                <h1 className='text-xl text-white font-semibold '>Summer Must-Haves:</h1>
                <h1 className='text-xl text-white font-semibold '>Nike Cortez TXT</h1>

              </div>
            </div>
          </Link>

          <Link href='/'>
            <div className='bg-[url(/pub.png)]  bg-[#0000006b] bg-blend-overlay rounded-md  bg-cover bg-center h-[500px] w-[95%] left-[2.5%] right-[2.5%] relative  mt-30'>
              <div className='flex flex-col gap-1 pl-5 pt-95'>

                <h1 className='text-xl text-white font-semibold '>Puma X Balenciaga:</h1>
                <h1 className='text-xl text-white font-semibold '>The Rise of  Worn Out Sneaker Styles</h1>

              </div>
            </div>
          </Link>

        </div>

      </div>

      
    </div>
  )
}

export default Trending
