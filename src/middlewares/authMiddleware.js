const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    let token;

    // 1. Check karein ke Header mein Authorization hai aur wo "Bearer" se shuru ho raha hai
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // 2. Header se Token nikalen (Bearer hata kar)
            // Format: "Bearer abc123xyz" -> [ "Bearer", "abc123xyz" ]
            token = req.headers.authorization.split(" ")[1];

            // 3. Token ko verify karein apne Secret key ke saath
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // console.log("Decoded: ", decoded);
            

            // 4. User ka data request object mein daal dein take aage controllers use kar saken
            // Ab req.user mein user ki ID aur email hogi jo humne token mein rakhi thi
            req.user = decoded;

            // 5. Agle function (Controller) par jane ki ijazat dein
            next();

        } catch (error) {
            console.error("Token verification failed:", error.message);
            res.status(401).json({ message: "Not authorized, token failed!" });
        }
    }

    // 6. Agar token mila hi nahi
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token provided!" });
    }
};

module.exports = { protect };