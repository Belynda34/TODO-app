import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import taskRoutes from './routers/taskRoutes.js'

// import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import swaggerJsonDoc from  './swagger/doc/swagger.json' assert { type: "json" };

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerJsonDoc))

app.use("/api/tasks",taskRoutes);

const PORT  = process.env.PORT || 5001

app.listen(PORT,()=>{
    console.log('Server started on port',PORT);
    console.log('MONGO_URI:',process.env.MONGO_URI);
    connectDB();
})


// uqOFdol5ShtvKyxR