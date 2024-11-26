// Imports
import { Product } from "../models/product.models.js";
import { uploadPhoto } from "../middlewares/imageUploadMiddleware.js";
import { resizeAndUploadImage } from "../middlewares/imageUploadMiddleware.js";


// Upload
export const createImage = (uploadPhoto.single('image'), resizeAndUploadImage, async (req, res) => {
  try {
    if (req.imageUrl) {
      // Save imageUrl to database.
      const newImage = new Image({ image: req.image });
      await newImage.save();

      console.log("Image saved to database:", newImage);

      res.json({
        message: "Image uploaded successfully and saved to the database",
        image: req.image, // Send URL of uploaded image.
      });
    } else {
      res.status(400).json({
        message: "No image uploaded",
      });
    }
  } catch (error) {
    console.error("Error saving image to database:", error);
    res.status(500).json({
      message: "Error saving image to database",
      error: error.message,
    });
  }
});


// FETCH
export const fetchImages = async (req, res) => {
  try {
    const images = await Image.find(); // Fetch all images.
    res.json({
      message: "Images fetched successfully",
      images,
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({
      message: "Error fetching images",
      error: error.message,
    });
  }
};


// Create
export const createProduct = async (req, res) => {
    try {
      // Destructure data from request body.
      const { name, price, imageUrl, address } = req.body;
  
      // Create new product.
      const newProduct = new Product({
        name,
        price,
        imageUrl,
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
      const { name, price, imageUrl, address } = req.body; 

      console.log('ID:', id); // Debugging
      console.log('Request Body:', req.body); // Debugging
  
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, price, imageUrl, address }, // Fields to update
        { new: true, runValidators: true } // Options: return the updated document and validate before updating
      );
  
      // If no product is found, return 404 response.
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Return updated product in response.
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
      console.log(response);
    } catch (error) {
      // Handle errors.
      console.error(error);
      res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};