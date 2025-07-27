
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";




export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide all the details",
                success: false,
            });
        }
        const isuserExists = await User.findOne({ email });
        if (isuserExists) {
            return res.status(400).json({
                message: `${isuserExists.name} is already exists !`,
                success: false,

            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save();
        return res.status(201).json({
            message: "user registered successfully",
            success: true,
            data: newUser
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        })
    }

}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide all the fields",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Password is incorrect",
                success: false
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Lax",
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful",
            success: true,
            token: token,
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

export const getMyProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token", success: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    res.status(200).json({ data: user, success: true });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

