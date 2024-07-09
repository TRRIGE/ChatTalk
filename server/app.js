import express from 'express';
import userRouter from './routes/user.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,PATCH,DELETE"
}));


app.use('/user', userRouter)
export default app; 