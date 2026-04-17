const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required!"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required!"],
        min: [0, "Price cannot be negative!"],
    },
    description: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        lowercase: true,
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});



module.exports = mongoose.model("Product", productSchema);