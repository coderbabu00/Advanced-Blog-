import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

const app = express();
dotenv.config();

// Connect with the database
mongoose.connect(process.env.mongo_url).then(() => {
    console.log('Connected with the database');
}).catch((err) => {
    console.log(err);
});

app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => console.log('Server started on port 3000'));
