
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/productsRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import userRoutes from './routes/usersRoutes.js';

// Load environment variables from .env file

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());

// Define routes for the application
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
