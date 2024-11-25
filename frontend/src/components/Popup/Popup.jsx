import React, { useState } from 'react';

export default function Popup({ product, onClose, onSave }) {
  const [updatedProduct, setUpdatedProduct] = useState({
    _id: product._id,
    name: product.name,
    price: product.price,
    image: product.image,
    address: product.address,
  });

  const [imageFile, setImageFile] = useState(null); 

  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setImageFile(file);
      setUpdatedProduct({ ...updatedProduct, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If file is selected, you need to upload file first.
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('productId', updatedProduct._id);

      // You can handle file upload to your server here.
      fetch('/api/products/upload', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            updatedProduct.image = data.imageUrl;
            onSave(updatedProduct);
          } else {
            alert('Error uploading image');
          }
        })
        .catch((err) => {
          console.error('Error uploading image:', err);
          alert('Error uploading image');
        });
    } else {
      onSave(updatedProduct);
    }
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
            type="file"
            accept="image/*"
            className="w-full p-3 border border-gray-300 rounded-md"
            onChange={handleFileChange}
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
