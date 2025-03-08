import mongoose from "mongoose";
import Product from "../models/product.model.js";


export  const getProduct = async (req,res) => {
    try {
        const products = await Product.find({}); // means fetch all the products from the database
        res.status(200).json({ success: true, data:products })
    } catch (error) {
        res.status(500).json({ success: false, message:"Server Error"})
    }
};

export const createProduct = async (req,res) => {
    const product = req.body; // user will send this data
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save(); // this is going to save it to the database
        res.status(201).json({ success: true, data: newProduct });
    } catch(error) {
        console.error("Error in Create product: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const updateProduct = async (req,res) => {
    const { id } = req.params;

    const product = req.body; // updated data

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({ success:false, message:"Invalid Product Id"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true}); // by default it is going to give the old document before the update happend
        res.status(200).json({ success:true, data:updatedProduct});
    } catch (error) {
        res.status(500).json({ success:false, message:"Server Error"});
    }
};

export const deleteProduct = async (req,res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({ success:false, message:"Invalid Product Id"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

