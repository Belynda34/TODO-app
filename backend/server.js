import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());

const PORT  = process.env.PORT || 5001

app.listen(PORT,()=>{
    console.log('Server started on port',PORT);
    console.log('MONGO_URI:',process.env.MONGO_URI);
    connectDB();
})


// uqOFdol5ShtvKyxR