const mongoose = require('mongoose');
const generateUniqueId = require('generate-unique-id');

const { Schema } = mongoose;

const id = generateUniqueId({
    length: 5,
    useLetters: false
});

const ProductSchema = new Schema({
    name: { type: String, required: true, trim: true }, 
    product_id : { type: String, required: true, index: { unique: true } },
    image_url: { type: String, required: true, trim: true }, 
    price: { type: Number, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    is_active: { type: Boolean, required: true, default: true },
    create_date: { type: Date, default: Date.now },
    create_by: { type: String, trim: true },
    modified_date: { type: Date, default: Date.now },
    modified_by: { type: String, trim: true }
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;