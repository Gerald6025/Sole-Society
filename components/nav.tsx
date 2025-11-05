"use client"
import { useState } from 'react'
import Link from 'next/link'
import { FaSearch, FaShoppingBag } from 'react-icons/fa'
import { RxAvatar, RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useCart } from '@/components/cartContext'

const Nav = () => {
  const [open, setOpen] = useState(false)
  const { items } = useCart()
  const count = items.reduce((sum, i) => sum + i.qty, 0)
  return (
    <div className='relative z-50 top-4 flex items-center justify-between px-4 py-2 sm:px-6 md:px-10'>
      <div>
        <h1 className='text-black'><Link href='/'>Sole Society</Link></h1>
      </div>
      <button
        aria-label='Toggle menu'
        className='text-black text-2xl md:hidden'
        onClick={() => setOpen(v => !v)}
      >
        {open ? <RxCross2 /> : <RxHamburgerMenu />}
      </button>
      <div className='hidden md:flex gap-5 md:gap-7'>
        <h1 className='text-black nav'><Link href='/'>New Arrivals</Link></h1>
        <h1 className='text-black nav'><Link href='/'>Men</Link></h1>
        <h1 className='text-black nav'><Link href='/'>Women</Link></h1>
        <h1 className='text-black nav'><Link href='/'>Brand</Link></h1>
        <h1 className='text-black nav'><Link href='/'>Sole</Link></h1>
      </div>
      <div className='flex gap-4 sm:gap-5 md:gap-6 text-xl'>
        <Link href='/search'><FaSearch className='text-black' /></Link>
        <Link href='/cart' className='relative'>
          <FaShoppingBag className='text-black' />
          {count > 0 && (
            <span className='absolute -top-2 -right-3 bg-red-600 text-white text-[10px] leading-none font-bold px-1.5 py-1 rounded-full min-w-[18px] text-center'>
              {count > 99 ? '99+' : count}
            </span>
          )}
        </Link>
        <Link href='/account'><RxAvatar className='text-black text-2xl' /></Link>
      </div>
      {open && (
        <div className='absolute left-0 top-full w-full bg-white border-t border-gray-200 md:hidden'>
          <div className='flex flex-col gap-4 p-4'>
            <Link className='text-black' href='/'>New Arrivals</Link>
            <Link className='text-black' href='/'>Men</Link>
            <Link className='text-black' href='/'>Women</Link>
            <Link className='text-black' href='/'>Brand</Link>
            <Link className='text-black' href='/'>Sole</Link>
          </div>
        </div>
      )}
    </div>
  )
}
export default Nav