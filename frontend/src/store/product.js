import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [], // Initial state for products.

// Create.
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.imageUrl || !newProduct.address) {
      return { success: false, message: 'Please fill in all fields.' };
    }

    try {
      const res = await fetch('/api/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      if (!data.product) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: [...state.products, data.product], // Add new product to state
      }));

      return { success: true, message: 'Product created successfully' };
    } catch (error) {
      return { success: false, message: 'Error creating product' };
    }
},


// Read.
fetchProducts: async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      set({ products: data.products }); // Set products in Zustand state.
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
},


// Update.
  updateProduct: async (id, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();
      if (!data.product) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.product : product
        ),
      }));

      return { success: true, message: 'Product updated successfully' };
    } catch (error) {
      return { success: false, message: 'Error updating product' };
    }
},


// Delete product.
  deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));

      return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
      return { success: false, message: 'Error deleting product' };
    }
  },
}));