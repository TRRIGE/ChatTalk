import express from 'express';
import { createUser, loginUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', createUser);
userRouter.post('/signin', loginUser)

export default userRouter;