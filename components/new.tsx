"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const New = () => {
  const items = [
    { label: 'New Arrivals', href: '/', image: 'https://res.cloudinary.com/dvqhcm07a/image/upload/v1761650876/NB_xezqdw.jpg' },
    { label: 'Best Sellers', href: '/', image: 'https://res.cloudinary.com/dvqhcm07a/image/upload/v1761650878/nike-basketball_csnxux.webp' },
    { label: 'New In Premium', href: '/', image: 'https://res.cloudinary.com/dvqhcm07a/image/upload/v1761729113/26SNEAKERS1-videoSixteenByNine3000-v3_gdpfns.jpg' },
    { label: 'Halloween Styles', href: '/', image: 'https://res.cloudinary.com/dvqhcm07a/image/upload/v1761650879/Halloween_sk8-hi-1-2_Landscape_osshtm.jpg' },
  ]
  const [active, setActive] = useState(0)
  return (
    <div className='flex justify-center mt-20 gap-62'>
      <div className="mt-30 flex flex-col items-start space-y-4">
        {items.map((item, i) => (
          <h1
            key={i}
            onMouseEnter={() => setActive(i)}
            className="
              font-black 
              text-4xl  
              text-black 
              transition-transform 
              duration-300 
              ease-in-out 
              hover:-rotate-3 
              origin-center
              cursor-pointer
              navy
            "
          >
            <Link href={item.href}>{item.label}</Link>
          </h1>
        ))}
      </div>

      <div>
        <Link href={items[active].href}>
          <Image
            src={items[active].image}
            alt={items[active].label}
            width={850}
            height={800}
            className='rounded-md'
          />
        </Link>
      </div>
    </div>
  )
}

export default New
