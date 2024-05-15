import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { showDataProduk } from "../../api/admin/ProdukApi";
import { getImage } from "../../api";

const OurProduct = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [randomProductsTitipan, setRandomProductsTitipan] = useState([]);
  const [produkData, setProdukData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
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

  useEffect(() => {
    const shuffleArray = (array) => {
      let currentIndex = array.length;
      let temporaryValue, randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    if (produkData.length > 0) {
      const products = produkData.map((item) => ({
        idProduk: item.id_produk,
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

      const shuffledProducts = shuffleArray([...products]);
      const readyStockProducts = shuffledProducts.filter(
        (product) => product.stokProduk !== null && product.stokProduk > 0
      );
      const preorderProducts = shuffledProducts.filter(
        (product) => product.stokProduk === null || product.stokProduk === 0
      );

      setRandomProducts(preorderProducts.slice(0, 4));
      setRandomProductsTitipan(readyStockProducts.slice(0, 4));
    }
  }, [produkData]);

  return (
    <div className="bg-[#232323] pb-20">
      <div className="max-w-screen-lg mx-auto px-4 pt-4">
        <h2 className="text-4xl md:text-6xl font-bold text-center my-8 text-white">
          Our Product
        </h2>
        <p className="text-lg md:text-xl text-center text-gray-600 mb-12 text-white">
          Jelajahi keunggulan produk-produk unggulan kami di Atma Kitchen,
          termasuk hampers ready stock dan preorder, yang dirancang untuk
          memanjakan lidah Anda dengan cita rasa istimewa dan kualitas terbaik
          yang pasti memikat dan memuaskan selera kuliner Anda!
        </p>
        <div className="flex justify-center">
          <Link to="/catalogue">
            <Button
              size="lg"
              color="white"
              className="rounded-xl bg-[#FFC655]"
              style={{ textTransform: "none" }}
            >
              See All
            </Button>
          </Link>
        </div>
      </div>

      <div className=" w-fit mx-auto mt-12 mb-6 pt-6 px-4 justify-items-center justify-center">
        <div className="">
          <h1 className="text-xl md:text-2xl font-bold mb-6 text-white">
            Pre-Order
          </h1>
          <p className="text-white md:text-lg text-gray-600 mb-12">
            Dapatkan pengalaman kuliner istimewa dengan pre-order pesan maksimal
            H-2 di Atma Kitchen, agar Anda selalu menikmati produk segar dan
            berkualitas setiap saat!
          </p>
        </div>
      </div>

      <section className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 justify-items-center justify-start m-10 gap-y-10 md:gap-x-6 mb-5">
          {randomProducts.map((product) => (
            <div
              key={product.idProduk}
              className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl overflow-hidden p-4" // Added padding here
              style={{ width: "100%", maxWidth: "350px" }}
            >
              <Link to="/catalogue">
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
                      Stok: {product.idStokProduk}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Limit Harian : {product.limitHarian}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className=" w-fit mx-auto mt-12 mb-6 pt-6 px-4 justify-items-center justify-center">
        <div className="">
          <h1 className="text-xl md:text-2xl font-bold mb-6 text-white">
            Ready Stock
          </h1>
          <p className="text-white md:text-lg text-gray-600 mb-12">
            Nikmati produk ready stock tanpa menunggu lama dan dapatkan
            pengalaman yang memanjakan lidah Anda dengan kelezatan yang memikat
            dan layanan yang cepat dan andal!
          </p>
        </div>
      </div>

      <section className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 justify-items-center justify-start m-10 gap-y-10 md:gap-x-6 mb-5">
            {randomProductsTitipan.map((product) => (
              <div
                key={product.idProduk}
                className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl overflow-hidden p-4" // Added padding here
                style={{ width: "100%", maxWidth: "350px" }}
              >
                <Link to="/catalogue">
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
                        Stok: {product.idStokProduk}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Limit Harian : {product.limitHarian}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
      </section>
    </div>
  );
};

export default OurProduct;
