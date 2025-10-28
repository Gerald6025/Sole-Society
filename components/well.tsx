import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const shoes = [
  {
    name: 'Nike Air Force 1',
    image: 'https://res.cloudinary.com/dvqhcm07a/image/upload/v1761597036/Nike_air_force_1_ogvgeo.jpg',
    href: '/'
  },
  {
    name: 'Adidas Samba',
    image: 'https://res.cloudinary.com/dvqhcm07a/image/upload/v1761597040/adidas_samba_lvexwf.jpg',
    href: '/'
  },
  {
    name: 'Converse Chuck Taylor',
    image: 'https://res.cloudinary.com/dvqhcm07a/image/upload/v1761597036/converse_mt21my.jpg',
    href: '/'
  },
  {
    name: 'Vans Knu Skool',
    image: 'https://res.cloudinary.com/dvqhcm07a/image/upload/v1761597039/vault-knu-skool_gj0mzu.webp',
    href: '/'
  }
]

const Well = () => {
  return (
    <div className="mt-10 px-10">
      <h1 className="ml-2 text-2xl font-semibold mb-7">Goes with Everything</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shoes.map((shoe) => (
          <div
            key={shoe.name}
            className="relative overflow-hidden  group"
            style={{ height: '500px', width: '106%' }} 
          >
            <Link href={shoe.href}>
              <Image
                src={shoe.image}
                alt={shoe.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-4 left-4">
                <h2 className="text-white text-lg font-semibold underline drop-shadow-md">
                  {shoe.name}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Well
