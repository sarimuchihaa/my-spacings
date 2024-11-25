import { useState } from "react";
import { Link } from "react-router-dom";

export default function Create() {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    image: '',
    address: '',
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];    // Get selected file.
    if (file) {
      const reader = new FileReader(); // Create FileReader to read file.
      reader.onloadend = () => {
        // Set file base64 URL in productData.
        setProductData({ ...productData, image: reader.result });
      };
      reader.readAsDataURL(file); // String
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission.
    console.log('Product data:', productData);

    // Send a POST request to the API
    try {
      const response = await fetch('/api/products/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Product added:", result);
        // Optionally reset form or show success message
        setProductData({
          name: '',
          price: '',
          image: '',
          address: '',
        });
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
              {productData.image && (
                  <img
                    src={productData.image}
                    alt="Preview"
                    className="mt-4 w-full h-auto rounded-md"
                  />
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
