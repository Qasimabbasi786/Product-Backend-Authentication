const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        

        // 1. Sab se pehle fields check karein
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please, fill all the fields (Name, Email, Password)!" });
        }

        // 2. Password ki length check karein
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters long!" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ 
            email: email,
        });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use!" });
        }

        // Password Salt and Hashing
        const saltt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Hash password use before saving
        });
        await newUser.save();
        res.status(201).json({ 
            message: "User registered successfully!",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        // 1. Fields check karein
        if(!email || !password){
            return res.status(400).json({message: "Please, fill all the fields (Email, Password)!"});
        }

        // 2. User exists check karein
        const user = await User.findOne({
            email: email,
        });

        if(!user){
            return res.status(400).json({message: "Invalid email or password!"});
        }

        // 3. Password match check karein
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password!"});
        }

        // 4. JWT Token generate karein
        const token = jwt.sign(
            {userId: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        // 5. Response bhejein
        res.status(200).json({
            message: "Login Successfull!",
            token: token,
            user:{
                userId:user._id,
                name: user.name,
                email: user.email,
            },
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {register, login};