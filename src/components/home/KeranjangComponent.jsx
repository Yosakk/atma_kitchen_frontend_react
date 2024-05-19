import React, { useState } from "react";
import { getImage } from "../../api";
import { Button } from "@material-tailwind/react";
import useRefresh from "../../services/useRefresh";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function KeranjangComponents() {
  const [products, setProducts] = useState(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      console.log(JSON.parse(cart))
      return JSON.parse(cart);
    }
    return [];
  });

  const [pickupDate, setPickupDate] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  const refresh = useRefresh("cartUpdated");

  const handleQuantityChange = (id, delta) => {
    const updatedProducts = products.map((product) => {
      if (product.idProduk === id) {
        const newQuantity = product.quantity + delta;
        if (newQuantity > 0) {
          return { ...product, quantity: newQuantity };
        }
      }
      return product;
    });
    setProducts(updatedProducts);
    updateCart(updatedProducts);
   
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter(
      (product) => product.idProduk !== id
    );
    setProducts(updatedProducts);
    updateCart(updatedProducts);
  };

  const updateCart = (updatedProducts) => {
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
     
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = products.reduce(
    (acc, product) => acc + product.hargaProduk * product.quantity,
    0
  );
  const totalProducts = products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const addresses = ["Alamat 1", "Alamat 2", "Alamat 3"]; // Contoh alamat
  const [selectedDeliveryType, setSelectedDeliveryType] = useState("");

  // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="flex flex-col md:flex-row p-4 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex-1 mr-4">
        <div className="md:ml-4 mt-4 md:mt-0 w-full bg-gray-50 p-4 shadow rounded-lg">
          <div className="font-semibold text-xl mb-4">Keranjang</div>
          <div className=" ">
            {products.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
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
                  {products.map((product) => (
                    <tr key={product.idProduk} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getImage(product.gambarProduk) && (
                            <img
                              src={getImage(product.gambarProduk)}
                              alt={product.namaProduk}
                              className="h-10 w-10 rounded-full mr-4"
                            />
                          )}
                          {product.namaProduk}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rp {product.hargaProduk.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() =>
                            handleQuantityChange(product.idProduk, -1)
                          }
                          disabled={product.quantity <= 1}
                          className="text-gray-600 bg-gray-200 rounded-l px-2 py-1 hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="px-4">{product.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(product.idProduk, 1)
                          }
                          className="text-gray-600 bg-gray-200 rounded-r px-2 py-1 hover:bg-gray-300"
                        >
                          +
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rp{" "}
                        {(
                          product.hargaProduk * product.quantity
                        ).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          onClick={() => handleDelete(product.idProduk)}
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

      {/* Summary Section */}
      <div className="md:ml-4 mt-4 md:mt-0 w-full md:w-1/3 bg-gray-50 p-4 shadow rounded-lg flex flex-col justify-between">
        <div>
          <div className="font-semibold text-xl mb-2">Ringkasan Belanja</div>
          <div className="flex justify-between mb-4">
            <span>Total ({totalProducts} Produk)</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tanggal Pengambilan
            </label>
            <input
              type="date"
              value={pickupDate}
              min={getCurrentDate()} // Setting minimum date to today
              onChange={(e) => setPickupDate(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Jenis Pengiriman
            </label>
            <select
              value={selectedDeliveryType}
              onChange={(e) => setSelectedDeliveryType(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="" disabled>
                Pilih jenis pengiriman
              </option>
              <option value="Delivery">Dikirim Kurir</option>
              <option value="Pickup">Ambil Sendiri</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Pilih Alamat
            </label>
            <select
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              disabled={selectedDeliveryType === "Pickup"}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="-" disabled={selectedDeliveryType === "Pickup"}>
                {selectedDeliveryType === "Pickup"
                  ? "Ambil Sendiri"
                  : "Pilih alamat"}
              </option>
              {addresses.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="w-full bg-[#FFC655] text-white p-2 rounded hover:bg-[#FFA900]">
          Beli ({totalProducts})
        </button>
      </div>
    </div>
  );
}

export default KeranjangComponents;
