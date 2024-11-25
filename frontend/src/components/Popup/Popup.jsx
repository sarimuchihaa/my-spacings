import React, { useState } from 'react';

export default function Popup({ product, onClose, onSave }) {
  const [updatedProduct, setUpdatedProduct] = useState({
    _id: product._id, // Include the product ID
    name: product.name,
    price: product.price,
    image: product.image,
    address: product.address,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedProduct); // Pass the updated product with `_id`
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={updatedProduct.name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={updatedProduct.address}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, address: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={updatedProduct.price}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={updatedProduct.image}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
          />
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
