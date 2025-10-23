"use client"
import React from 'react'
import Link from 'next/link'
import { FaSearch, FaShoppingBag,  } from 'react-icons/fa'
import { RxAvatar } from "react-icons/rx";

const Nav = () => {
  return (
    <div className='relative z-50 top-7  flex justify-between items-center p-2 px-10  '>
      <div><h1 className='text-black'><Link href='/'>Sole Society</Link></h1></div>
      <div className='flex  gap-7'>
   <h1 className='text-black nav'><Link href='/'>New Arrivals</Link></h1>
   <h1 className='text-black nav'><Link href='/'>Men</Link></h1>
   <h1 className='text-black nav'><Link href='/'>Women</Link></h1>
   <h1 className='text-black nav'><Link href='/'>Brand</Link></h1>
   <h1 className='text-black nav'><Link href='/'>Sole</Link></h1>


      </div>
      <div className='flex gap-6 text-xl'>
        <Link href='/search'><FaSearch className='text-black ' /></Link>
        <Link href='/cart'><FaShoppingBag className='text-black' /></Link>
        <Link href='/account'><RxAvatar className='text-black text-2xl ' /></Link>
        
      </div>
    
    </div>
  
  )
}
export default Nav