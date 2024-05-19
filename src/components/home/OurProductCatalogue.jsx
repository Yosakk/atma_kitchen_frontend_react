import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showDataHampers, showDataProduk } from "../../api/admin/ProdukApi";
import { getImage } from "../../api";
import useRefresh from "../../services/useRefresh";

import "../home/animation.css";
import { isToday, addDays } from "date-fns";

const groupProductsByCategory = (productList) => {
  // Group products by kategori_produk
  const groupedProducts = {};
  productList.forEach((product) => {
    if (!groupedProducts[product.kategori_produk]) {
      groupedProducts[product.kategori_produk] = [];
    }
    groupedProducts[product.kategori_produk].push(product);
  });
  return groupedProducts;
};

const shuffleArray = (array) => {
  // Using Fisher-Yates shuffle algorithm
  return array;
};
const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
const day = String(today.getDate()).padStart(2, "0");
const currentDate = `${year}-${month}-${day}`;

const addDaysFromToday = (n) => {
  const today = new Date();
  return addDays(today, n);
};

const OurProductCatalogue = () => {
  const [produkData, setProdukData] = useState([]);
  const [hampersData, setHampersData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartAnimationProductId, setCartAnimationProductId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const minPreOrderDate = addDaysFromToday(2); // Tanggal H+2 dari hari ini

  // Fungsi untuk mengecek apakah tanggal dipilih kurang dari H+2 dari hari ini
  const isDateBeforeMinPreOrder = (selectedDate) => {
    return selectedDate < minPreOrderDate.toISOString().split("T")[0];
  };

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
  const todayDate = selectedDate;

  const checkDailyLimit = (item, selectedDate) => {
    const formattedDate = selectedDate;
    const dailyLimitEntry = item.limit_harian.find(
      (limit) => limit.tanggal_limit === formattedDate
    );
    if (dailyLimitEntry) {
      return {
        limitHarian: dailyLimitEntry.jumlah_limit,
        tanggalLimit: formattedDate,
      };
    }
    return { limitHarian: 0, tanggalLimit: "-" };
  };

  const products = produkData.map((item) => {
    const { limitHarian, tanggalLimit } = checkDailyLimit(item, selectedDate);
    return {
      id_produk: item.id_produk,
      nama_produk: item.nama_produk,
      gambar_produk: item.gambar_produk,
      deskripsi_produk: item.deskripsi_produk,
      harga_produk: item.harga_produk,
      kategori_produk: item.kategori_produk,
      statusProduk: item.status_produk,
      kuantitas: item.quantitas,
      namaPenitip: item.detail_produk_titipan
        ? item.detail_produk_titipan.penitip.nama_penitip
        : null,
      limitHarian: limitHarian,
      tanggalLimit: tanggalLimit,
      stok_produk: item.stok_produk ? item.stok_produk.stok_produk : null,
      idStokProduk: item.stok_produk ? item.stok_produk.id_stok_produk : null,
      idPenitip: item.detail_produk_titipan
        ? item.detail_produk_titipan.penitip.id_penitip
        : null,
    };
  });

  const productsHampers = hampersData.map((item) => ({
    id_produk_hampers: item.id_produk_hampers,
    nama_produk_hampers: item.nama_produk_hampers,
    gambar_produk_hampers: item.gambar_produk_hampers,
    deskripsi_produk_hampers: item.deskripsi_produk_hampers,
    harga_produk_hampers: item.harga_produk_hampers,
  }));

  // Group products by kategori_produk
  const groupedProducts = groupProductsByCategory(products);

  // Shuffle products within each kategori_produk
  Object.keys(groupedProducts).forEach((kategori_produk) => {
    groupedProducts[kategori_produk] = shuffleArray(
      groupedProducts[kategori_produk]
    );
  });

  const groupedHampers = groupProductsByCategory(productsHampers);

  // Shuffle hampers products within each kategori_produk
  Object.keys(groupedHampers).forEach((kategori_produk) => {
    groupedHampers[kategori_produk] = shuffleArray(
      groupedHampers[kategori_produk]
    );
  });

  const refresh = useRefresh("cartUpdated");
  const handleAddToCart = (product, type) => {
    setSelectedProduct(product);
    const item = {
      product: product,
      type: type,
    };
    // Mengambil keranjang dari localStorage
    let cart = localStorage.getItem("cart");
    if (!cart) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }
    let kategori = localStorage.getItem("kategori");
    if (!kategori) {
      kategori = [];
    } else {
      kategori = JSON.parse(kategori);
    }

    // Mengecek apakah produk sudah ada di keranjang
    const existingProductIndex = cart.findIndex(
      (item) => item.id_produk === product.id_produk
    );

    if (existingProductIndex !== -1) {
      // Jika produk sudah ada di keranjang, tambahkan jumlahnya
      cart[existingProductIndex].quantity += 1;
    } else {
      // Jika produk belum ada di keranjang, tambahkan produk baru
      cart.push({ ...product, quantity: 1 });
    }
    kategori.push(type);
    
    // Menyimpan kembali keranjang ke localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
    localStorage.setItem("kategori", JSON.stringify(kategori));
    console.log(kategori)

    // Emit event untuk memberi tahu perubahan pada keranjang
    window.dispatchEvent(new Event("cartUpdated"));
    setCartAnimationProductId(product.id_produk);
    setTimeout(() => {
      setCartAnimationProductId(null);
    }, 500);
    // Menampilkan toast bahwa produk berhasil ditambahkan ke keranjang
    toast.success("Produk berhasil ditambahkan ke keranjang");

    // Simpan tombol mana yang ditekan ke localStorage
    
  };

  const flyToNavbar = (buttonId) => {
    const button = document.getElementById(buttonId);
    const navbar = document.getElementById("navbar");
    const buttonRect = button.getBoundingClientRect();
    const navbarRect = navbar.getBoundingClientRect();

    const deltaX = navbarRect.left - buttonRect.left;
    const deltaY = navbarRect.top - buttonRect.top;

    button.style.transition = "transform 0.5s ease-out";
    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    setTimeout(() => {
      button.style.transition = "none";
      button.style.transform = "none";
    }, 500);
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Mengubah tanggal yang dipilih menjadi format yang sesuai
    setSelectedDate(formattedDate); // Memperbarui selectedDate dengan tanggal yang dipilih
    console.log("Selected Date:", formattedDate); // Mencetak tanggal yang dipilih ke konsol
  };

  return (
    <div className="bg-white pb-20 ">
      <div className="mb-4 mt-4 ml-10 relative w-full min-w-[100px] max-w-[300px]">
        <label
          htmlFor="tanggal_pengambilan"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Tanggal Pengambilan
        </label>
        <DatePicker
          selected={selectedDate} // Menggunakan selectedDate sebagai nilai tanggal yang dipilih
          onChange={handleDateChange} // Memanggil fungsi handleDateChange ketika tanggal berubah
          className="w-full md:w-fit mx-auto mt-4 mb-4 p-1 border-2 border-gray-300 rounded-lg"
          dateFormat={"yyyy-MM-dd"}
          minDate={getCurrentDate()}
        />
      </div>
      {/* Display shuffled products */}
      {Object.keys(groupedProducts).map((kategori_produk, index) => (
        <div
          key={index}
          className="w-full md:w-fit mx-auto mt-12 mb-6 pt-6 px-4 justify-items-center justify-center"
        >
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-6 ">
              {kategori_produk}
            </h1>
            <p className=" md:text-lg text-gray-600 mb-12">
              {`Produk-produk ${kategori_produk.toLowerCase()} yang berkualitas tinggi dari Atma Kitchen.`}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 justify-items-center justify-start m-10 gap-y-10 md:gap-x-6 mb-5">
            {groupedProducts[kategori_produk].map((product) => (
              <div
                key={product.id_produk}
                className={`bg-white shadow-md rounded-xl hover:scale-105 hover:shadow-xl overflow-hidden p-4 ${
                  cartAnimationProductId === product.id_produk
                    ? "add-to-cart-button-animation"
                    : ""
                }`} // Tambahkan kelas animasi jika cartAnimation true
                style={{ width: "100%", maxWidth: "350px" }}
              >
                <Link to="">
                  <div className="h-80 w-full">
                    <img
                      src={getImage(product.gambar_produk)}
                      alt={product.nama_produk}
                      className="h-full w-full object-fit rounded-t-xl"
                    />
                  </div>

                  <div className="px-4 py-3 flex-grow justify-between">
                    <div className="px-4 py-3">
                      <p className="text-md font-bold text-black truncate block capitalize">
                        {product.nama_produk}
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
                        {product.deskripsi_produk}
                      </span>
                      <div className="flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto my-3">
                          Rp.{product.harga_produk}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Stok: {product.stok_produk}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {product.limitHarian
                          ? `Limit Harian : ${product.limitHarian}`
                          : "Limit harian tidak tersedia"}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {product.limitHarian
                          ? `Tanggal Limit Harian : ${product.tanggalLimit}`
                          : "Limit harian tidak tersedia"}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="w-full flex mb-4 items-center justify-between">
                  <Button
                    id={`addToCartButton_${product.id_produk}`}
                    className="flex-grow mr-2"
                    color="blue"
                    onClick={() => {
                      handleAddToCart(product, "Ready Stok"); // Tambahkan "Ready Stok" sebagai parameter
                      flyToNavbar(`addToCartButton_${product.id_produk}`);
                    }}
                    disabled={product.stok_produk <= 0}
                  >
                    Ready Stok
                  </Button>
                  <Button
                    id={`addToCartButton_${product.id_produk}`}
                    className="flex-grow"
                    color="red"
                    onClick={() => {
                      handleAddToCart(product, "Pre Order"); // Tambahkan "Pre Order" sebagai parameter
                      flyToNavbar(`addToCartButton_${product.id_produk}`);
                    }}
                    disabled={
                      isDateBeforeMinPreOrder(selectedDate) ||
                      product.limit_harian <= 0
                    }
                  >
                    Pre Order
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
              key={productHampers.id_produk_hampers}
              className={`bg-white shadow-md rounded-xl overflow-hidden p-4 ${
                cartAnimationProductId === productHampers.id_produk_hampers
                  ? "add-to-cart-animation"
                  : ""
              }`}
              style={{ width: "100%", maxWidth: "350px" }}
            >
              <Link to="">
                <div className="h-80 w-full">
                  <img
                    src={getImage(productHampers.gambar_produk_hampers)}
                    alt={productHampers.nama_produk_hampers}
                    className="h-full w-full object-fit rounded-t-xl"
                  />
                </div>

                <div className="px-4 py-3 flex-grow justify-between">
                  <div className="px-4 py-3">
                    <p className="text-md font-bold text-black truncate block capitalize">
                      {productHampers.nama_produk_hampers}
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
                      {productHampers.deskripsi_produk_hampers}
                    </span>

                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black cursor-auto my-3 ">
                        Rp.{productHampers.harga_produk_hampers}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="mb-4">
                <Button
                  className="w-full"
                  onClick={() =>
                    handleAddToCart(productHampers, "Pre Order") // Tambahkan "Hampers" sebagai parameter
                  }
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OurProductCatalogue;
