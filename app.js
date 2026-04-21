require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const productRoutes = require("./src/routes/productRoutes");
const authRoutes = require("./src/routes/authRoutes");
const connectDB = require("./src/config/db");


// 1. Database Connect karein
connectDB();

// 2. Middleware
app.use(express.json());

// 3. Routes
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});