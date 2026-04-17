const Product = require('../models/product');


// CREATE: Add a new product
createProduct = async (req, res)=> {
    try {
        const { title, price, description, category } = req.body;

        if (!title || !price) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide title and price" 
            });
        }

        const newProduct = new Product({ 
            title, 
            price,
            description, 
            category 
        });

        await newProduct.save();
        
        res.status(201).json({
            success: true,
            message: "Product added successfully!",
            data: newProduct
        });
    }
    catch (error) {
        res.status(500).json({
        success: false,
        message:'Error creating product',
        error: error.message
        });
    }
};


// READ: Get all products
getAllProducts = async (req, res) => {
    try {
        // 1. URL se queries pakarna (e.g., ?title=mobile)
        const { title, category, page = 1, limit = 10 } = req.query;

        // 2. Ek khali object banayen jisme hum search ki shartein (conditions) rakhenge
        let searchQueries = {};

        // Agar user ne title bheja hai, to usay search mein shamil karo
        if (title) {
            searchQueries.title = { $regex: title, $options: 'i' }; 
            // $regex ka matlab hai "milta julta naam", 'i' ka matlab capital/small ka farq nahi
        }

        // Agar user ne category bheji hai, to usay bhi shamil karo
        if (category) {
            searchQueries.category = category;
        }

        // 3. Pagination ka hisaab (Skip logic)
        // Agar page 2 hai aur limit 10, to pehle 10 products skip kardo
        let skipProducts = (page - 1) * limit;

        // 4. Database se data mangwana
        const products = await Product.find(searchQueries) // Search/Filter apply kiya
            .limit(Number(limit))                         // Kitne products dikhane hain
            .skip(skipProducts);                          // Kitne chor kar agay se dikhane hain

        // 5. Response bhejna
        res.status(200).json({
            totalFound: products.length,
            data: products
        });

    } catch (error) {
        res.status(500).json({ message: "Data nahi mil saka", error: error.message });
    }
};


// getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find();

//         if (!products || products.length === 0) {
//             return res.status(404).json({ message: "Products List is Emptyy" });
//         }

//         res.status(200).json({
//             success: true,
//             total: products.length,
//             data: products,
//             message: "Products retrieved successfully!"
//         });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };


// READ: Get a single product by ID
getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }
        
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error getting product', error });
    }
};


// UPDATE: Update a product by ID
updateProduct = async (req, res) => {
    try {
        const { title, description, price, category } = req.body;

        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (title) product.title = title;
        if (description) product.description = description;
        if (price) product.price = price;
        if (category) product.category = category;

        await product.save();

        res.status(200).json({ message: "Product updated successfully!", product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};


// DELETE: Delete a product by ID
deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.deleteOne(); 

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};


module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
};