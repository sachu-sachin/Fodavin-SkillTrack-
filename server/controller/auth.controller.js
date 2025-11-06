import User from '../models/User.js';
import {generateAccessToken, generateRefreshToken} from "../utilities/jwtToken.js";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check account status inactive or banned
        if (user.status !== "active") {
            return res.status(403).json({ message: "Account is not active" });
        }

        // Check password
        const isPassMatch = await user.passwordCheck(password);
        if (!isPassMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate tokens
        const accessToken =  generateAccessToken({userId:user._id, role:user.role});
        const refreshToken = generateRefreshToken({userId:user._id, role:user.role});

        // user.refreshTokens.push({token:refreshToken}); - for multiple device
        user.refreshTokens = [{token:refreshToken}];
        await user.save();

        // Set refreshtoken on cookies
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken: accessToken,
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: error.message });
    }
};

const register = async (req, res) => {
    try {
        const { name, email, password, role, status } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already registered" });
        }


        const user = new User({ name, email, password, role, status });
        await user.save(); // triggers pre("save")

        const { _id, name: uName, email: uEmail, role: uRole, status: uStatus } = user;

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { _id, name: uName, email: uEmail, role: uRole, status: uStatus },
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong during registration",
            error: error.message,
        });
    }
};

const me = async (req, res) => {
   try {
       const user = req.user;
       if (!user) {
           return res.status(404).json({ message: "User not found" });
       }

       res.status(200).json({message: "User fetched successfully",user});
   }catch (error) {
       res.status(500).json({message: "Something went wrong during me", error: error.message});
   }
}


export { login ,register, me };