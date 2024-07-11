import express from 'express';
import { createUser, forgotPassword, loginUser, logoutUser, resetPassword, verifyUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', createUser);
userRouter.post('/signin', loginUser)
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);
userRouter.get('/verify-user', verifyUser, (req, res) => {
    res.json({ status: true, message: "User verified" });
});
userRouter.get('/logout', logoutUser);

export default userRouter;