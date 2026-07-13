import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import incidentRoutes from "./routes/incidentRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";


dotenv.config();

connectDB();
const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/auth",authRoutes);
app.use("/api/incidents",incidentRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running...");
});
app.use(errorHandler);
 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});