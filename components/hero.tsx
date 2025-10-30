"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      id: 1,
      name: "Stay Classic",
      title: "Go Knu Skool",
      description:
        "Vans Knu Skool brings a bold, reimagined twist to a classic icon. Inspired by the original Old Skool from the ‘90s, the Knu Skool amplifies everything you love  puffed-up suede panels, oversized tongue, and signature wavy sidestripe. Designed with attitude and all-day comfort, it’s a throwback made for today’s generation.",
      image:
        "https://res.cloudinary.com/dvqhcm07a/image/upload/v1761221858/red_vans-removebg-preview_z186wm.png",
      color: "#7f1217",
      width: 600,
      height: 600,
      position: "bottom-50",
      alt: "vans",
    },
    {
      id: 2,
      name: "Built to Win",
      title: "Born to Dunk",
      image:
        "https://res.cloudinary.com/dvqhcm07a/image/upload/v1761224977/blue_nike-removebg-preview_ttxd8s.png",
      description:
        "Nike Dunk is more than a sneaker it’s a symbol of sport, style, and self-expression. Born on the basketball court in 1985 and reborn through skate culture and street fashion, the Dunk has transcended generations.",
      color: "#3574a3",
      width: 600,
      height: 600,
      position: "md:top-10",
      alt: "nike",
    },
  
     {
      id: 3,
      name: "Stay Original",
      title: "Stay Campus",
      image:
        "https://res.cloudinary.com/dvqhcm07a/image/upload/v1761298801/camp-removebg-preview_kqbnan.png",
      description:
        " A timeless sneaker icon blending vintage street style with modern flair. Born in the courts, it evolved into a cultural staple. Loved for its simplicity, comfort, and effortless cool. A symbol of self-expression across generations. Always classic, never out of style.",
      color: "#1d473e",
      width: 600,
      height: 600,
      position: "top-5",
      alt: "nike",
    },
  
  
  
  ];

  const currentProduct = products[currentIndex];

  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <div className="relative grid grid-cols-2 gap-20 pt-40 px-10 w-full h-[100vh] overflow-hidden">
    
      <div className="flex flex-col justify-start">
        
        <div className="relative overflow-hidden h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-0"
            >
              <h1 className="text-black text-7xl font-black">
                {currentProduct.name}
              </h1>
              <h1 className="text-black text-6xl font-black">
                {currentProduct.title}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        
        <h1 className="text-black text-lg font-regular pt-7 w-[90%]">
          {currentProduct.description}
        </h1>

        
        <h1 className="bg-black text-white w-[20%] p-2 flex justify-center items-center mt-10">
          <Link href="/shop">Shop Now</Link>
        </h1>
      </div>

      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProduct.id} 
          className="relative"
          initial={{ x: 280, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -280, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div
            style={{ backgroundColor: currentProduct.color }}
            className="h-110 w-110 rounded-full absolute"
          ></div>
          <Image
            src={currentProduct.image}
            alt={currentProduct.alt}
            width={currentProduct.width}
            height={currentProduct.height}
            className={`${currentProduct.position} right-20 relative animate-[float_5s_infinite]`}
          />
        </motion.div>
      </AnimatePresence>

    
      <div className="absolute right-4 bottom-20 flex flex-col space-y-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-black" : "bg-gray-400" 
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
