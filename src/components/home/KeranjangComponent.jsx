import React, { useState, useEffect, useReducer } from "react";
import { getImage } from "../../api";
import { Button, Input } from "@material-tailwind/react";
import useRefresh from "../../services/useRefresh";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { storeTransaksi } from "../../api/customer/TransaksiApi";
import { showAlamat } from "../../api/customer/customerApi";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

function KeranjangComponents() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [alamatData, setAlamatData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await showAlamat();
      setAlamatData(response.data);
      console.log("masuk alamat", response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const [products, setProducts] = useState(() => {
    const cart = localStorage.getItem("cart");
    console.log(cart);
    if (cart) {
      return JSON.parse(cart);
    }
    return [];
  });

  const [kategori, setKategori] = useState(() => {
    const kategori = localStorage.getItem("kategori");
    console.log("ini kategori di keranjang", kategori);
    if (kategori) {
      return JSON.parse(kategori);
    }
    return [];
  });

  const [categoryStatus, setCategoryStatus] = useState("mixed");

  const checkCategory = (kategori) => {
    if (!Array.isArray(kategori)) {
      return "Invalid category data";
    }

    const hasPreOrder = kategori.some((item) => item === "Pre-Order");

    if (hasPreOrder) {
      return "Pre-Order";
    }

    const allReadyStock = kategori.every((item) => item === "Ready Stock");

    if (allReadyStock) {
      return "Ready Stock";
    }

    return "mixed";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter and map produk_id and jumlah for normal products
    const produk_id = products
      .filter((product) => product.id_produk)
      .map((product) => product.id_produk);

    const jumlah = products
      .filter((product) => product.id_produk)
      .map((product) => product.quantity);

    // Filter and map produk_hampers_id and jumlah_produk_hampers for hampers
    const produk_hampers_id = products
      .filter((product) => product.id_produk_hampers)
      .map((product) => product.id_produk_hampers);

    const jumlah_produk_hampers = products
      .filter((product) => product.id_produk_hampers)
      .map((product) => product.quantity);

    const jenis_produk = kategori.map((kategori) => kategori);
    const jenis_pengiriman = selectedDeliveryType;

    console.log(jumlah);
    console.log("ini jumlah produk hampers", jumlah_produk_hampers);

    // Create the finalFormData object and only add non-empty arrays
    const finalFormData = {
      ...formData,
      jenis_pengiriman,
      jenis_produk,
    };

    if (produk_id.length > 0) {
      finalFormData.produk_id = produk_id;
    }

    if (jumlah.length > 0) {
      finalFormData.jumlah = jumlah;
    }

    if (produk_hampers_id.length > 0) {
      finalFormData.produk_hampers_id = produk_hampers_id;
    }

    if (jumlah_produk_hampers.length > 0) {
      finalFormData.jumlah_produk_hampers = jumlah_produk_hampers;
    }

    console.log(finalFormData);

    storeTransaksi(finalFormData)
      .then((res) => {
        const transaksiId = res.data.id_transaksi;
        console.log(transaksiId);
        toast.success("Transaksi Produk berhasil!");
        localStorage.clear("cart");
        localStorage.clear("kategori");
        setTimeout(() => {
          if (selectedDeliveryType === "Pickup") {
            navigate(`/pembayaran/${transaksiId}`); // Change this to your desired route for Pickup
          } else if (selectedDeliveryType === "Diantar") {
            navigate("/checkout/view"); // Change this to your desired route for Delivery
          }
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Transaksi Produk gagal!");
      });
  };


  useEffect(() => {
    const status = checkCategory(kategori);
    setCategoryStatus(status);
    console.log("Category Status di keranjang:", status);
  }, [kategori]);

  const [pickupDate, setPickupDate] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  const refresh = useRefresh("cartUpdated");

  const handleQuantityChange = (id, delta, category, id_produk_hampers) => {
    const updatedProducts = products.map((product) => {
      // Cek apakah produk memiliki id yang cocok, kategori yang sesuai, dan id_produk_hampers yang sesuai
      if (
        product.id_produk === id &&
        kategori[products.indexOf(product)] === category &&
        product.id_produk_hampers === id_produk_hampers
      ) {
        const newQuantity = product.quantity + delta;
        if (newQuantity > 0) {
          return { ...product, quantity: newQuantity };
        }
      }
      return product;
    });

    console.log(updatedProducts);
    setProducts(updatedProducts);
    updateCart(updatedProducts);
  };

  // const handleDelete = (id) => {
  //   const updatedProducts = products.filter(
  //     (product) => product.id_produk !== id
  //   );
  //   const productIndex = products.findIndex(
  //     (product) => product.id_produk === id
  //   );
  //   setProducts(updatedProducts);
  //   updateCart(updatedProducts);
  //   removeCategoryFromLocalStorage(productIndex);
  // };
  const handleDelete = (id, kategoriProduk) => {
    const updatedProducts = products.filter((product) => {
      return !(
        product.id_produk === id &&
        kategoriProduk === kategori[products.indexOf(product)]
      );
    });

    setProducts(updatedProducts);
    updateCart(updatedProducts);
    removeCategoryFromLocalStorage(id, kategoriProduk);
  };

  const updateCart = (updatedProducts) => {
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // const removeCategoryFromLocalStorage = (index) => {
  //   let kategori = JSON.parse(localStorage.getItem("kategori")) || [];
  //   if (index >= 0 && index < kategori.length) {
  //     kategori.splice(index, 1);
  //     localStorage.setItem("kategori", JSON.stringify(kategori));
  //     setKategori(kategori);
  //   }
  // };
  const removeCategoryFromLocalStorage = (id, kategoriProduk) => {
    let kategori = JSON.parse(localStorage.getItem("kategori")) || [];
    const index = products.findIndex((product) => product.id_produk === id);
    if (index >= 0 && index < kategori.length) {
      kategori.splice(index, 1);
      localStorage.setItem("kategori", JSON.stringify(kategori));
      setKategori(kategori);
    }
  };

  const total = products.reduce(
    (acc, product) => acc + product.harga_produk * product.quantity,
    0
  );
  const totalhampers = products.reduce(
    (acc, product) => acc + product.harga_produk_hampers * product.quantity,
    0
  );
  const totalProducts = products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const addressesTableData = alamatData.map((item) => ({
    id_alamat: item.id_alamat,
    id_user: item.id_user,
    full_address: item.full_address,
  }));
  // const addresses = ["Alamat 1", "Alamat 2", "Alamat 3"];
  const [selectedDeliveryType, setSelectedDeliveryType] = useState("");

  const getCurrentDate = (offsetDays = 0) => {
    const today = new Date();
    today.setDate(today.getDate() + offsetDays);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="flex flex-col md:flex-row p-4 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex-1 md:w-2/3 mr-4">
        <div className="md:ml-4 mt-4 md:mt-0 w-full bg-gray-50 p-4 shadow rounded-lg ">
          <div className="font-semibold text-xl mb-4">Keranjang</div>
          <div className="overflow-x-auto ">
            {products.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Harga
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kuantitas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hapus
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id_produk} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.id_produk_hampers ? (
                            <>
                              {getImage(product.gambar_produk_hampers) && (
                                <img
                                  src={getImage(product.gambar_produk_hampers)}
                                  alt={product.nama_produk_hampers}
                                  className="h-10 w-10 rounded-full mr-4"
                                />
                              )}
                              <div>
                                <span>{product.nama_produk_hampers}</span>
                                <span className="ml-1 text-gray-500">
                                  ({kategori[index]})
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              {getImage(product.gambar_produk) && (
                                <img
                                  src={getImage(product.gambar_produk)}
                                  alt={product.nama_produk}
                                  className="h-10 w-10 rounded-full mr-4"
                                />
                              )}
                              <div>
                                <span>{product.nama_produk}</span>
                                <span className="ml-1 text-gray-500">
                                  ({kategori[index]})
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rp{" "}
                        {product.id_produk_hampers
                          ? product.harga_produk_hampers
                          : product.harga_produk}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product.id_produk,
                              -1,
                              kategori[index],
                              product.id_produk_hampers
                            )
                          }
                          disabled={product.quantity <= 1}
                          className="text-gray-600 bg-gray-200 rounded-l px-2 py-1 hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="px-4">{product.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product.id_produk,
                              1,
                              kategori[index],
                              product.id_produk_hampers
                            )
                          }
                          className="text-gray-600 bg-gray-200 rounded-r px-2 py-1 hover:bg-gray-300"
                        >
                          +
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rp{" "}
                        {product.id_produk_hampers
                          ? (
                            product.harga_produk_hampers * product.quantity
                          ).toLocaleString()
                          : (
                            product.harga_produk * product.quantity
                          ).toLocaleString()}{" "}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          onClick={() =>
                            handleDelete(product.id_produk, kategori[index])
                          }
                          className="bg-red-600 hover:bg-red-800"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-10">Keranjang kosong</div>
            )}
          </div>
        </div>
      </div>

      <div className="md:w-1/3 p-4 bg-gray-50 shadow rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="font-semibold text-xl mb-4">Ringkasan Belanja</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Produk:</span>
              <span>{totalProducts}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Harga:</span>
              <span>Rp {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Status Kategori:</span>
              <span>{categoryStatus}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2">
              <label htmlFor="pickup-date" className="block text-gray-700">
                Tanggal Pengambilan:
              </label>
              <Input
                type="date"
                id="pickup-date"
                name="tanggal_pengambilan"
                onChange={setFormData}
                min={getCurrentDate(
                  categoryStatus === "Pre-Order"
                    ? 2
                    : categoryStatus === "Ready Stock"
                      ? 0
                      : 0
                )}
                className="mt-1 block w-full"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="alamat" className="block text-gray-700">
              Alamat Pengiriman:
            </label>
            <select
              id="alamat"
              name="alamat_pengiriman"
              onChange={setFormData}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Pilih Alamat</option>
              {addressesTableData.map((address, index) => (
                <option key={index} value={address.full_address}>
                  {address.full_address}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Jenis Pengiriman:</label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="pickup"
                name="jenis_pengiriman"
                value="Pickup"
                checked={selectedDeliveryType === "Pickup"}
                onChange={(e) => setSelectedDeliveryType(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="pickup" className="mr-4">
                Ambil Sendiri
              </label>
              <input
                type="radio"
                id="delivery"
                name="jenis_pengiriman"
                value="Diantar"
                checked={selectedDeliveryType === "Diantar"}
                onChange={(e) => setSelectedDeliveryType(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="delivery">Antar ke Alamat</label>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button
              type="submit"
              className="w-full bg-[#FFC655] text-white p-2 rounded hover:bg-[#FFA900] mt-4"
            >
              Checkout <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default KeranjangComponents;
