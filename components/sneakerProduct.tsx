
import React from "react";
import Image from "next/image";



interface SneakerProductProps {
  name: string;
  model: string;
  price: number;
  image: string;
  sizes: number[];
  selectedSize?: number;
  onSizeSelect?: (size: number) => void;
  onBuy?: () => void;
}

const SneakerProduct: React.FC<SneakerProductProps> = ({
  name,
  model,
  price,
  image,
  sizes,
  selectedSize,
  onSizeSelect,
  onBuy,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-10 rounded-2xl shadow-sm max-w-5xl mx-auto">
      {/* Product Info */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-3xl font-bold uppercase">{name}</h1>
          <h2 className="text-xl text-gray-500">{model}</h2>
        </div>

        <p className="text-2xl font-semibold text-gray-800">{new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(price)}</p>

        <div>
          <p className="text-gray-600 mb-2">Select size:</p>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => onSizeSelect?.(size)}
                className={`px-4 py-2 rounded-lg border transition ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl text-lg"
          onClick={onBuy}
        >
          Add to cart
        </button>
      </div>

      {/* Product Image */}
      <div className="flex-1 flex items-center justify-center relative mt-10 md:mt-0">
        <div className="absolute w-64 h-64 bg-red-600 rounded-full -z-10" />
        <Image
          src={image}
          alt={model}
          width={600}
          height={400}
          className="w-96 max-w-full object-contain drop-shadow-lg"
        />
      </div>
    </div>
  );
};

export default SneakerProduct;
