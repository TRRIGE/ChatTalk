import "dotenv/config";
import nodemailer from "nodemailer";
import User from "../models/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GoogleGenerativeAI } from "@google/generative-ai"


const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ email })
        if (!userExists) {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                username,
                email,
                password: hashPassword
            });
            res.status(201).json({ status: true, user });
        } else {
            return res.status(400).json({ status: false, message: "User already exists" });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ status: false, message: "User is not register" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ status: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { maxAge: 3600000, httpOnly: true });
        return res.status(200).json({ status: true, message: "User logged in successfully" });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ status: false, message: "User is not register" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "5m" });

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: 'rutujakothekar2@gmail.com',
                pass: 'oceo chjv kumz idrn'
            }
        });

        var mailOptions = {
            from: 'rutujakothekar2@gmail.com',
            to: email,
            subject: 'Email from ChatTalk',
            text: `Please click on the link to reset your password: http://localhost:5173/reset-password/${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({ status: false, message: "Email not sent" });
            } else {
                return res.status(200).json({ status: true, message: "Email sent successfully for password reset" });
            }
        });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token) {
            return res.status(400).json({ status: false, message: "Token is missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        if (!userId) {
            return res.status(400).json({ status: false, message: "Invalid token" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate({ _id: userId }, { password: hashPassword });

        return res.status(200).json({ status: true, message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

const verifyUser = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ status: false, message: "User not verified and no token present" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }

}

const logoutUser = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ status: true, message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }

}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiAIResponse = async (req, res) => {
    try {
        const prompt = {
            contents: [
                {
                    parts: [
                        {
                            text: req.body?.input
                        }
                    ]
                }
            ]
        };

        // const generationConfig = {
        //     stopSequences: ["red"],
        //     maxOutputTokens: 200,
        //     temperature: 0.9,
        //     topP: 0.1,
        //     topK: 16,
        // };

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        let text = response.candidates[0].content.parts[0].text;
        text = text.replace(/\*/g, "");
        return res.status(200).json({ status: true, message: text });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

export {
    createUser,
    loginUser,
    forgotPassword,
    resetPassword,
    verifyUser,
    logoutUser,
    getGeminiAIResponse,
}