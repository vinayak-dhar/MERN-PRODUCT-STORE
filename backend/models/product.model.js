import mongoose from "mongoose";

// Schema 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
}, {
    timestamps: true // cereatedAt, updatedAt
});

// mongoDB converts the Product to products 
const Product = mongoose.model('Product',productSchema); // product object

export default Product;