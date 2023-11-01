import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { productRouter } from './routers/productRouter';
import { seedRouter } from './routers/seedRouter';
import { userRounter } from './routers/userRouter';
import { orderRouter } from './routers/orderRouter';
import { keyRouter } from './routers/keyRouter';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mogodb://localhost/mernamazona';
mongoose.set('strictQuery', true);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch(() => {
    console.log('Error mongodb');
  });

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/users', userRounter);
app.use('/api/seed', seedRouter);
app.use('/api/orders', orderRouter);
app.use('/api/keys', keyRouter);

app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html')),
);

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
