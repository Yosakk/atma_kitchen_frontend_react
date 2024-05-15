import React, { useState } from 'react';

function KeranjangComponents() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Matcha Organik Bubuk 100 gr', price: 300000, quantity: 1, image:'/src/assets/images/Matcha Bubuk/319536.jpg' },
    { id: 2, name: 'Matcha Organik Bubuk 100 gr', price: 300000, quantity: 1, image:'/src/assets/images/Matcha Bubuk/319536.jpg' }
  ]);

  const handleQuantityChange = (id, delta) => {
    const newProducts = products.map(product => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + delta };
      }
      return product;
    });
    setProducts(newProducts);
  };

  const handleDelete = id => {
    const newProducts = products.filter(product => product.id !== id);
    setProducts(newProducts);
  };

  const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const totalProducts = products.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <div className='p-4'>
      <div className='bg-white shadow-lg rounded-lg p-4'>
        {products.map((product, index) => (
          <div key={product.id} className={`flex items-center justify-between mb-4 ${index !== products.length ? 'border-b pb-5' : ''}`}>
            <div className='flex items-center'>
              <img src={product.image} alt={product.name} className='h-20 w-20 mr-4' />
              <div>
                <div className='font-semibold'>{product.name}</div>
                <div className='text-gray-700'>Rp {product.price.toLocaleString()}</div>
              </div>
            </div>
            <div className='flex items-center border'>
              <button onClick={() => handleQuantityChange(product.id, -1)} disabled={product.quantity <= 1}>-</button>
              <div className='mx-4 border'>{product.quantity}</div>
              <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
            </div>
            <div>Rp {(product.price * product.quantity).toLocaleString()}</div>
            <button onClick={() => handleDelete(product.id)} className='text-red-500 hover:text-red-700'>Delete</button>
          </div>
        ))}
        <div className='flex justify-between items-center'>
          <div className='font-bold'>Total Harga ({totalProducts} produk): Rp {total.toLocaleString()}</div>
          <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default KeranjangComponents;
