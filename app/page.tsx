import React from 'react'
import Hero from '@/components/hero'
import LogoRowAnimated from '@/components/six'
import Well from '@/components/well'
import New from '@/components/new'
import JustDropped from '@/components/JustDropped'


const Home = () => {
  return (
    <div className='bg-[#ffffff] w-full h-[700vh] absolute  top-0 left-0 overflow-hidden'>
      <Hero />
      <LogoRowAnimated />
      <Well />
      <New />
      <JustDropped />
      
    </div>
  )
}

export default Home
