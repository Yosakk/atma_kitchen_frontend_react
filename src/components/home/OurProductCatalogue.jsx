import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showDataHampers, showDataProduk } from "../../api/admin/ProdukApi";
import { getImage } from "../../api";
import useRefresh from "../../services/useRefresh";

import "../home/animation.css";

const groupProductsByCategory = (productList) => {
  // Group products by kategoriProduk
  const groupedProducts = {};
  productList.forEach((product) => {
    if (!groupedProducts[product.kategoriProduk]) {
      groupedProducts[product.kategoriProduk] = [];
    }
    groupedProducts[product.kategoriProduk].push(product);
  });
  return groupedProducts;
};

const shuffleArray = (array) => {
  // Using Fisher-Yates shuffle algorithm
  return array;
};

const OurProductCatalogue = () => {
  const [produkData, setProdukData] = useState([]);
  const [hampersData, setHampersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartAnimationProductId, setCartAnimationProductId] = useState(null);

  useEffect(() => {
    fetchData();
    fetchDataHampers();
  }, []);

  const fetchData = async () => {
    try {
      const response = await showDataProduk();
      setProdukData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  const fetchDataHampers = async () => {
    try {
      const response = await showDataHampers();
      setHampersData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const products = produkData.map((item) => ({
    idProduk: item.id_produk,
    // idProdukHampers: item.id_produk_hampers,
    namaProduk: item.nama_produk,
    gambarProduk: item.gambar_produk,
    deskripsiProduk: item.deskripsi_produk,
    hargaProduk: item.harga_produk,
    kategoriProduk: item.kategori_produk,
    statusProduk: item.status_produk,
    kuantitas: item.quantitas,
    namaPenitip: item.detail_produk_titipan
      ? item.detail_produk_titipan.penitip.nama_penitip
      : null,
    limitHarian: item.limit_harian ? item.limit_harian.jumlah_limit : null,
    stokProduk: item.stok_produk ? item.stok_produk.stok_produk : null,
    idStokProduk: item.stok_produk ? item.stok_produk.id_stok_produk : null,
    idPenitip: item.detail_produk_titipan
      ? item.detail_produk_titipan.penitip.id_penitip
      : null,
  }));
  const productsHampers = hampersData.map((item) => ({
    // idProduk: item.id_produk,
    idProdukHampers: item.id_produk_hampers,
    namaProduk: item.nama_produk_hampers,
    gambarProduk: item.gambar_produk_hampers,
    deskripsiProduk: item.deskripsi_produk_hampers,
    hargaProduk: item.harga_produk_hampers,
  }));
  // Group products by kategoriProduk
  const groupedProducts = groupProductsByCategory(products);

  // Shuffle products within each kategoriProduk
  Object.keys(groupedProducts).forEach((kategoriProduk) => {
    groupedProducts[kategoriProduk] = shuffleArray(
      groupedProducts[kategoriProduk]
    );
  });

  const groupedHampers = groupProductsByCategory(productsHampers);

  // Shuffle hampers products within each kategoriProduk
  Object.keys(groupedHampers).forEach((kategoriProduk) => {
    groupedHampers[kategoriProduk] = shuffleArray(
      groupedHampers[kategoriProduk]
    );
  });
  const refresh = useRefresh("cartUpdated");
  const handleAddToCart = (product) => {
    
    // Mengambil keranjang dari localStorage
    let cart = localStorage.getItem('cart');
    if (!cart) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }
  
    // Mengecek apakah produk sudah ada di keranjang
    const existingProductIndex = cart.findIndex((item) => item.idProduk === product.idProduk);
  
    if (existingProductIndex !== -1) {
      // Jika produk sudah ada di keranjang, tambahkan jumlahnya
      cart[existingProductIndex].quantity += 1;
    } else {
      // Jika produk belum ada di keranjang, tambahkan produk baru
      cart.push({ ...product, quantity: 1 });
    }
  
    // Menyimpan kembali keranjang ke localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
     console.log(cart)
  
    // Emit event untuk memberi tahu perubahan pada keranjang
    window.dispatchEvent(new Event("cartUpdated"));
    setCartAnimationProductId(product.idProduk);
    setTimeout(() => {
      setCartAnimationProductId(null);
    }, 500);
    // Menampilkan toast bahwa produk berhasil ditambahkan ke keranjang
    toast.success('Produk berhasil ditambahkan ke keranjang');
  };
  const flyToNavbar = (buttonId) => {
    const button = document.getElementById(buttonId);
    const navbar = document.getElementById('navbar');
    const buttonRect = button.getBoundingClientRect();
    const navbarRect = navbar.getBoundingClientRect();

    const deltaX = navbarRect.left - buttonRect.left;
    const deltaY = navbarRect.top - buttonRect.top;

    button.style.transition = 'transform 0.5s ease-out';
    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    setTimeout(() => {
        button.style.transition = 'none';
        button.style.transform = 'none';
    }, 500);
};




  return (
    <div className="bg-white pb-20 ">
      {/* Display shuffled products */}
      {Object.keys(groupedProducts).map((kategoriProduk, index) => (
        <div
          key={index}
          className="w-full md:w-fit mx-auto mt-12 mb-6 pt-6 px-4 justify-items-center justify-center"
        >
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-6 ">
              {kategoriProduk}
            </h1>
            <p className=" md:text-lg text-gray-600 mb-12">
              {`Produk-produk ${kategoriProduk.toLowerCase()} yang berkualitas tinggi dari Atma Kitchen.`}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 justify-items-center justify-start m-10 gap-y-10 md:gap-x-6 mb-5">
            {groupedProducts[kategoriProduk].map((product) => (
              <div
                key={product.idProduk}
                className={`bg-white shadow-md rounded-xl hover:scale-105 hover:shadow-xl overflow-hidden p-4 ${cartAnimationProductId === product.idProduk ? 'add-to-cart-button-animation' : ''}`}// Tambahkan kelas animasi jika cartAnimation true
                style={{ width: "100%", maxWidth: "350px" }}
              >
                <Link to="">
                  <div className="h-80 w-full">
                    <img
                      src={getImage(product.gambarProduk)}
                      alt={product.namaProduk}
                      className="h-full w-full object-fit rounded-t-xl"
                    />
                  </div>

                  <div className="px-4 py-3 flex-grow justify-between">
                    <div className="px-4 py-3">
                      <p className="text-md font-bold text-black truncate block capitalize">
                        {product.namaProduk}
                      </p>
                      <span
                        className="text-gray-400 mr-3 text-xs overflow-y-auto"
                        style={{
                          height: "3em",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {product.deskripsiProduk}
                      </span>
                      <div className="flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto my-3">
                          Rp.{product.hargaProduk}
                        </p>
                        <del>
                          <p className="text-sm text-gray-600 cursor-auto ml-2">
                            Rp.{product.discountedPrice}
                          </p>
                        </del>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Stok: {product.stokProduk}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Limit Harian : {product.limitHarian}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="mb-4">
                <Button
                    id={`addToCartButton_${product.idProduk}`}
                    className="w-full"
                    onClick={() => {
                      handleAddToCart(product);
                      flyToNavbar(`addToCartButton_${product.idProduk}`);
                    }}
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="w-full md:w-fit mx-auto mt-12 mb-6 pt-6 px-4 justify-items-center justify-center overflow-x-auto">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-6 ">Hampers</h1>
          <p className="md:text-lg text-gray-600 mb-12">
            Produk-produk hampers yang berkualitas tinggi dari Atma Kitchen.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-start m-10 gap-y-10 md:gap-x-6 mb-5">
          {productsHampers.map((productHampers) => (
            <div
              key={productHampers.idProdukHampers}
              className={`bg-white shadow-md rounded-xl overflow-hidden p-4 ${cartAnimationProductId === productHampers.idProdukHampers ? 'add-to-cart-animation' : ''}`} // Added padding here
              style={{ width: "100%", maxWidth: "350px" }}
            >
              <Link to="">
                <div className="h-80 w-full">
                  <img
                    src={getImage(productHampers.gambarProduk)}
                    alt={productHampers.namaProduk}
                    className="h-full w-full object-fit rounded-t-xl"
                  />
                </div>

                <div className="px-4 py-3 flex-grow justify-between">
                  <div className="px-4 py-3">
                    <p className="text-md font-bold text-black truncate block capitalize">
                      {productHampers.namaProduk}
                    </p>
                    <span
                      className="text-gray-400 mr-3 text-xs overflow-y-auto"
                      style={{
                        height: "3em",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {productHampers.deskripsiProduk}
                    </span>
                    
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black cursor-auto my-3 ">
                        Rp.{productHampers.hargaProduk}
                      </p>
                      <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">
                          Rp.{productHampers.discountedPrice}
                        </p>
                      </del>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="mb-4">
                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(productHampers)}
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default OurProductCatalogue;
