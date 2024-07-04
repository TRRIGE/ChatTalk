import User from "../models/user.model.js"
import bcrypt from "bcrypt";

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

export {
    createUser
}