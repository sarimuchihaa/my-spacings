import { Product } from "../models/product.models.js";

// Create
export const createProduct = async (req, res) => {
    try {
      // Destructure data from request body.
      const { name, price, address } = req.body;

      // Get image file from request.
      const image = req.file ? `/uploads/${req.file.filename}` : null; // Image path saved in DB.
  
      // Create new product.
      const newProduct = new Product({
        name,
        price,
        image,
        address,
      });
  
      // Save product.
      await newProduct.save();
  
      // Return response with created product.
      res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};


// GET
export const getProducts = async (req, res) => {
    try {
      const products = await Product.find(); 
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};
  

// GET BY ID
export const getProductById = async (req, res) => {
    try {
      const { id } = req.params; 
      const product = await Product.findById(id); 
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' }); 
      }
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// Delete
export const deleteProductById = async (req, res) => {
    try {
      const { id } = req.params; 
      const product = await Product.findByIdAndDelete(id); 

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};


// Update
export const updateProductById = async (req, res) => {
    try {
      const { id } = req.params; 
      const { name, price, image, address } = req.body; 
  
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, price, image, address }, // Fields to update
        { new: true, runValidators: true } // Options: return the updated document and validate before updating
      );
  
      // If no product is found, return 404 response.
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Return updated product in response.
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      // Handle errors.
      res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};