import express from "express";
import data from "./data.js";
import repData from "./data-reparacion.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js";
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
// import categoryRouter from "./routes/categoryRoutes.js";


dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("[DB] conectado a la base de datos");
  })
  .catch((err) => {
    console.error(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);
// app.get('/api/categories', categoryRouter);

// app.get("/api/services", (req, res) => {
//   res.send(repData.servicios);
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.clear();
  console.log(`[SERVER] APP LISTENING http://localhost:${PORT}`);
});
