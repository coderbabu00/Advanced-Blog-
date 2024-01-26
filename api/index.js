import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

//Connect with database
mongoose.connect(process.env.mongo_url).then(() => {
    console.log('Connected with database');
}).catch((err) => {
    console.log(err)
})

app.listen(3000, () => console.log('Server started on port 3000'));