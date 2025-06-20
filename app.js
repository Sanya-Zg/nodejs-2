import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import express from 'express';
const app = express();
import connectDB from './db/connect.js';
import productsRoutes from './routes/products.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddlewareHandler from './middleware/error-handler.js';

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
})

app.use('/api/v1/products', productsRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddlewareHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}....`));
    } catch (error) {
        console.log(error);
    }
}
start();