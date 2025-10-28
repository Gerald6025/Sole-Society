import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Well = () => {
  return (
    <div className='mt-10'>
      <div>
<h1 className='ml-10 text-2xl'>Goes with Everything</h1>
      </div>
    
    
    <div className='mt-7 grid grid-cols-4 gap-1 px-10 relative'>
    
    <div>
    <Link href="/"> <Image src="https://res.cloudinary.com/dvqhcm07a/image/upload/v1761597036/Nike_air_force_1_ogvgeo.jpg" alt="" width={350} height={700} 
        
        className='object-cover absolute h-120'/> </Link>

        <h1 className='text-white relative top-105 left-3 font-semibold text-lg underline'><Link href="/">Nike Air Force 1</Link></h1>
    </div>

     <div>
    <Link href="/"> <Image src="/adidas samba.jpg" alt="" width={350} height={700} 
        
        className='object-cover absolute h-120'/> </Link>

        <h1 className='text-white relative top-105 left-3 font-semibold text-lg underline'><Link href="/">Adidas Samba</Link></h1>
    </div>

     <div>
    <Link href="/"> <Image src="/converse.jfif" alt="" width={350} height={700} 
        
        className='object-cover absolute h-120'/> </Link>

        <h1 className='text-white relative top-105 left-3 font-semibold text-lg underline'><Link href="/">Converse Chuck Taylor</Link></h1>
    </div>

     <div>
    <Link href="/"> <Image src="/vault-knu-skool.jpg" alt="" width={350} height={700} 
        
        className='object-cover absolute h-120'/> </Link>

        <h1 className='text-white relative top-105 left-3 font-semibold text-lg underline'><Link href="/">Vans Knu Skool</Link></h1>
    </div>
    
    
    </div>
    </div>
  )
}

export default Well