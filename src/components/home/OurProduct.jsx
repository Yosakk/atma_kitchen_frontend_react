import React from "react";
import { Button } from "@material-tailwind/react";

// Sample product data array
const products = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    brand: "Brand A",
    name: "Product Name A",
    price: 149,
    discountedPrice: 199,
    stock: 10,
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    brand: "Brand B",
    name: "Product Name B",
    price: 99,
    discountedPrice: 129,
    stock: 20,
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    brand: "Brand C",
    name: "Product Name C",
    price: 99,
    discountedPrice: 129,
    stock: 20,
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    brand: "Brand D",
    name: "Product Name D",
    price: 99,
    discountedPrice: 129,
    stock: 20,
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    brand: "Brand E",
    name: "Product Name E",
    price: 99,
    discountedPrice: 129,
    stock: 20,
  },
  // Add more products as needed
];

const OurProduct = () => {
  return (
    <div className="bg-[#232323]">
      <div className="max-w-screen-lg mx-auto px-4 pt-4">
        <h2 className="text-4xl md:text-6xl font-bold text-center my-8 text-white">
          Our Product
        </h2>
        <p className="text-lg md:text-xl text-center text-gray-600 mb-12 text-white">
          Jelajahi keunggulan produk-produk unggulan kami di Atma Kitchen, termasuk hampers ready stock dan preorder, yang dirancang untuk memanjakan lidah Anda dengan cita rasa istimewa dan kualitas terbaik yang pasti memikat dan memuaskan selera kuliner Anda!
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            color="white"
            className="rounded-xl bg-[#FFC655]"
            style={{ textTransform: "none" }}
          >
            See All
          </Button>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto mt-12 mb-6 px-4">
        <div className="w-2/3">
          <h1 className="text-xl md:text-2xl font-bold mb-6 text-white">Pre-Order</h1>
          <p className="text-white md:text-lg lg:text-xl xl:text-2xl">
            Dapatkan pengalaman kuliner istimewa dengan pre-order pesan maksimal H-2 di Atma Kitchen, agar Anda selalu menikmati produk segar dan berkualitas setiap saat!
          </p>
        </div>
        
      </div>

      <section className=" mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 justify-items-center justify-center gap-y-20 gap-x-14 mb-5">
        {/* Map over products array to generate product cards */}
        {products.map((product) => (
          <div key={product.id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="#">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3">
                <span className="text-gray-400 mr-3 uppercase text-xs">{product.brand}</span>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product.name}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    ${product.price}
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">${product.discountedPrice}</p>
                  </del>
                  <div className="ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-bag-plus"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                      />
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Stok: {product.stock}</p>
              </div>
            </a>
          </div>
        ))}
      </section>
    </div>
  );
};

export default OurProduct;
