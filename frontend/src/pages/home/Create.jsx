import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Create() {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    image: '',
    address: '',
  });
  
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Store file for upload
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send form data
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("address", productData.address);
    if (file) {
      formData.append("image", file); // Append file to FormData
    }

    try {
      const response = await fetch("/api/products/create", {
        method: "POST",
        body: formData, // Send FormData object
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Product added:", result);

        // Reset form fields and navigate
        setProductData({
          name: '',
          price: '',
          address: '',
        });
        setFile(null);
        navigate("/");
      } else {
        console.error("Failed to add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };




  return (
    <div className="min-h-screen bg-white text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/">
            <h1 className="text-cyan-500 text-3xl font-bold">Spacing Store 🛒✈️</h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-8">
        <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-lg">
          <div className="p-4">
            <h2 className="text-3xl text-center flex justify-center items-center gap-2">
              Create New Spacing
              <span role="img" aria-label="handbag">👜</span>
            </h2>
          </div>
          <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-gray-400"
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-gray-400"
                value={productData.address}
                onChange={(e) => setProductData({ ...productData, address: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-gray-400"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
              />
               <input
                type="file"
                accept="image/*"
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-gray-400"
                onChange={(e) => handleFileUpload(e)}
              />
              {file && (
                <p className="text-gray-400 mt-2">Selected File: {file.name}</p>
              )}
              <button type="submit" className="w-full p-3 bg-[#3BB5E5] hover:bg-[#3BB5E5]/90 text-white rounded-md">
                Add Spacing
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
