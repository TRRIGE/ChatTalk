import "dotenv/config";
import nodemailer from "nodemailer";
import User from "../models/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
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

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'youremail@gmail.com',
                pass: 'yourpassword'
            }
        });

        var mailOptions = {
            from: 'youremail@gmail.com',
            to: 'myfriend@yahoo.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

export {
    createUser,
    loginUser,
    forgotPassword
}