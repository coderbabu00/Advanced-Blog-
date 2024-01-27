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

//Middlewares
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';

    res.status(statusCode).json({ 
        success: false,
        statusCode,
        message,
        
     });
})
app.listen(3000, () => console.log('Server started on port 3000'));
