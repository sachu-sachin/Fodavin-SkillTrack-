import jwt from 'jsonwebtoken'
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader  = req.headers.authorization;

        if(!authHeader || !authHeader.includes('Bearer')) return res.status(401).json({ message: "No token provided" });

        const token = authHeader.split(' ')[1];

        const decode = await jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        console.log(decode);

        const user = await User.findById(decode.user.userId).select('-password -refreshTokens'); // excluding password and refresh tokens field

        if(!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
        next();

    }catch (error) {
        console.error("Auth error:", error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}


export const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};