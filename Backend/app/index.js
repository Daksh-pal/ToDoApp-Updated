import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);

const DBconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected ", mongoose.connection.name);
  } catch (error) {
    console.log(error);
  }
};
app.listen(PORT, async () => {
  await DBconnect();
  console.log(`Server listening at PORT ${PORT}`);
});
