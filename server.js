import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors';
import path from 'path'


const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT_NO || 5000

dotenv.config();
//database config
connectDB();
//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

//static file
app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

app.get('/', (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>")
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`.bgCyan.white);
})