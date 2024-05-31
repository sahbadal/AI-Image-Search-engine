import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import connectDB from './mongodb/connet.js';
dotenv.config();
const app = express();
const PORT =process.env.PORT;
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);
app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log(`server running on port: http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();