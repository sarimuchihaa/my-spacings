import React, { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import Popup from '../../components/Popup/Popup.jsx';
import { useProductStore } from '../../store/product.js';
import { Edit2, PlusCircle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';


const Home = () => {
  const { products, fetchProducts, updateProduct, deleteProduct } = useProductStore((state) => ({
    products: state.products,
    fetchProducts: state.fetchProducts,
    updateProduct: state.updateProduct,
    deleteProduct: state.deleteProduct,
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const [selectedProduct, setSelectedProduct] = useState(null); 

  // Fetch products on component mount.
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEdit = (product) => {
    console.log('Editing Product:', product); // Log to confirm product includes `_id`
    setSelectedProduct(product); // Set the selected product.
    setShowPopup(true);          // Show the popup.
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setIsLoading(true);
      try {
        const result = await deleteProduct(id);
        if (result.success) {
          fetchProducts(); // Refresh product list after deletion.
        }
        alert(result.message);
      } catch (error) {
        console.error('Error deleting product:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSaveUpdatedProduct = async (updatedProduct) => {
    console.log('Updated Product:', updatedProduct); // Log the entire object
    console.log('Updated Product ID:', updatedProduct._id); // Log the _id
    setIsLoading(true);
    try {
      const result = await updateProduct(updatedProduct._id, updatedProduct); // Ensure _id is used here
      if (result.success) {
        fetchProducts(); // Refresh the product list
      }
      alert(result.message);
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <LogoutButton className="w-40 h-40" />
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-cyan-500">Spacing Store 🛒✈️</h1>
          <div className="flex items-center gap-4">
            <Link to="/create">
              <button className="p-2 rounded-full bg-transparent hover:bg-gray-200">
                <PlusCircle className="h-10 w-10 text-gray-600" />
              </button>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">No products available</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="overflow-hidden rounded-lg shadow-lg bg-white">
                <div className="relative aspect-[3/1]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-2xl text-blue-500">{product.name}</h3>
                    <h3 className="font-bold text-xl text-amber-800">{product.address}</h3>
                    <p className="text-lg font-bold text-green-500">${product.price}</p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <div className="flex w-full gap-2">
                    <button
                      className="flex-1 py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md flex items-center justify-center gap-2"
                      onClick={() => handleEdit(product)} // Edit button
                    >
                      <Edit2 className="h-6 w-6 text-green-500" /> <span>Edit</span>
                    </button>
                    <button
                      className="flex-1 py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center gap-2"
                      onClick={() => handleDelete(product._id)}>
                        <Trash2 className="h-6 w-6 text-red-600" /> <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Conditionally render popup */}
      {showPopup && selectedProduct && (
        <Popup
          product={selectedProduct}
          onClose={() => setShowPopup(false)} // Close popup.
          onSave={handleSaveUpdatedProduct}   // Passsave function to handle updating product.
        />
      )}
    </div>
  );
};

export default Home;
