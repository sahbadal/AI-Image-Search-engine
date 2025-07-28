import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import connectDB from "./mongodb/connet.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from Stability AI!",
  });
});

// Start the server and connect to the database
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () =>
      console.log(`server running on port: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
