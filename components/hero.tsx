import React from "react";
import Link from "next/link";
import Image from "next/image";


const hero = () => {
  const products = [
    {
      id: 1,
      name: "Stay Classic",
      title: " Go Knu Skool",
      description:
        "Vans Knu Skool brings a bold, reimagined twist to a classic icon. Inspired by the original Old Skool from the ‘90s, the Knu Skool amplifies everything you love  puffed-up suede panels, oversized tongue, and signature wavy sidestripe. Designed with attitude and all-day comfort, it’s a throwback made for today’s generation.",
      image:
        "https://res.cloudinary.com/dvqhcm07a/image/upload/v1761221858/red_vans-removebg-preview_z186wm.png",
      color: '#7f1217',
      width: 700,
      height: 700,
      position: 'bottom-50',
      alt: 'vans',
    },
    {
      id: 2,
      name: "Built to StandOut",
      title: "Born to Dunk",
      image:
        "https://res.cloudinary.com/dvqhcm07a/image/upload/v1761224977/blue_nike-removebg-preview_ttxd8s.png",
      description:
        "Nike Dunk is more than a sneaker it’s a symbol of sport, style, and self-expression. Born on the basketball court in 1985 and reborn through skate culture and street fashion, the Dunk has transcended generations.",
      color: '#3574a3',
      width: 600,
      height: 600,
      position: 'top-10',
      alt: 'nike',
    },
  ];

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className=" grid grid-cols-2 gap-20 pt-40 px-10 w-full h-[100vh] ">
          <div>
            <h1 className="text-black text-7xl font-black">{product.name}</h1>
            <h1 className="text-black text-6xl font-black">{product.title}</h1>
            <h1 className="text-black text-lg font-regular pt-7 w-[90%]">
              {product.description}
            </h1>
            <h1 className="bg-black text-white w-[20%] p-2 flex justify-center items-center mt-10">
              <Link href="/shop">Shop Now</Link>
            </h1>
          </div>

          <div>
            <div style={{backgroundColor: product.color}} className="h-110 w-110 rounded-full absolute"></div>
            <Image
              src={product.image}
              alt={product.alt}
              width={product.width}
              height={product.height}
              className={`${product.position} right-20 relative animate-[float_5s_infinite]`}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default hero;
