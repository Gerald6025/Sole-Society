import React from 'react'
import Hero from '@/components/hero'
import LogoRowAnimated from '@/components/six'
import Well from '@/components/well'
import New from '@/components/new'
import JustDropped from '@/components/JustDropped'
import Yeezy from '@/components/yeezy'
import Top from '@/components/top'
import Trending from '@/components/trending'

const Home = () => {
  return (
    <div className='bg-[#ffffff] w-full md:h-[1200vh] h-[1100vh] absolute  top-0 left-0 overflow-hidden'>
      <Hero />
      <LogoRowAnimated />
      <Well />
      <New />
      <JustDropped />
      <Yeezy />
      <Top />
      <Trending />
    </div>
  )
}

export default Home
