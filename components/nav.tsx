"use client"
import { useState } from 'react'
import Link from 'next/link'
import { FaSearch, FaShoppingBag } from 'react-icons/fa'
import { RxAvatar, RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useCart } from '@/components/cartContext'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const Nav = () => {
  const [open, setOpen] = useState(false)
  const { items, clearWithoutPersist } = useCart()
  const { data: session } = useSession()
  const pathname = usePathname()
  const isAuth = pathname === '/signin' || pathname === '/signup' || pathname === '/coming-soon'
  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const firstName = (session?.user?.name || '').split(' ')[0] || ''
  const initial = firstName ? firstName[0]?.toUpperCase() : ''
  return (
    <div className='relative z-50 top-4 flex items-center justify-between px-4 py-2 sm:px-6 md:px-10'>
      <div>
        <h1 className={isAuth ? 'text-white' : 'text-black'}><Link href='/'>Sole Society</Link></h1>
      </div>
      <button
        aria-label='Toggle menu'
        className={(isAuth ? 'text-white' : 'text-black') + ' text-2xl md:hidden'}
        onClick={() => setOpen(v => !v)}
      >
        {open ? <RxCross2 /> : <RxHamburgerMenu />}
      </button>
      <div className='hidden md:flex gap-5 md:gap-7'>
        <h1 className={(isAuth ? 'text-white' : 'text-black') + ' nav'}><Link href='/coming-soon'>New Arrivals</Link></h1>
        <h1 className={(isAuth ? 'text-white' : 'text-black') + ' nav'}><Link href='/coming-soon'>Men</Link></h1>
        <h1 className={(isAuth ? 'text-white' : 'text-black') + ' nav'}><Link href='/coming-soon'>Women</Link></h1>
        <h1 className={(isAuth ? 'text-white' : 'text-black') + ' nav'}><Link href='/coming-soon'>Brand</Link></h1>
        <h1 className={(isAuth ? 'text-white' : 'text-black') + ' nav'}><Link href='/coming-soon'>Sole</Link></h1>
      </div>
      <div className='flex gap-4 sm:gap-5 md:gap-6 text-xl items-center'>
        <Link href='/search'><FaSearch className={isAuth ? 'text-white' : 'text-black'} /></Link>
        <Link href='/cart' className='relative'>
          <FaShoppingBag className={isAuth ? 'text-white' : 'text-black'} />
          {count > 0 && (
            <span className='absolute -top-2 -right-3 bg-red-600 text-white text-[10px] leading-none font-bold px-1.5 py-1 rounded-full min-w-[18px] text-center'>
              {count > 99 ? '99+' : count}
            </span>
          )}
        </Link>
        {((session?.user as { role?: string } | undefined)?.role === 'admin') && (
          <Link href='/admin' className={'text-sm border px-2 py-1 rounded ' + (isAuth ? 'text-white border-white' : 'text-black border-black')}>
            Admin
          </Link>
        )}
        {session?.user ? (
          <div className='flex items-center gap-3'>
            <Link href='/account' className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold'>
                {initial || 'A'}
              </div>
            </Link>
            <button onClick={() => { clearWithoutPersist(); signOut({ callbackUrl: '/' }) }} className='text-sm border px-2 py-1 rounded'>Sign out</button>
          </div>
        ) : (
          <Link href='/signin'>
            <RxAvatar className={(isAuth ? 'text-white' : 'text-black') + ' text-2xl'} />
          </Link>
        )}
      </div>
      {open && (
        <div className={'absolute left-0 top-full w-full border-t md:hidden ' + (isAuth ? 'bg-transparent border-white/30' : 'bg-white border-gray-200')}>
          <div className='flex flex-col gap-4 p-4'>
            <Link className={isAuth ? 'text-white' : 'text-black'} href='/coming-soon'>New Arrivals</Link>
            <Link className={isAuth ? 'text-white' : 'text-black'} href='/coming-soon'>Men</Link>
            <Link className={isAuth ? 'text-white' : 'text-black'} href='/coming-soon'>Women</Link>
            <Link className={isAuth ? 'text-white' : 'text-black'} href='/coming-soon'>Brand</Link>
            <Link className={isAuth ? 'text-white' : 'text-black'} href='/coming-soon'>Sole</Link>
          </div>
        </div>
      )}
    </div>
  )
}
export default Nav