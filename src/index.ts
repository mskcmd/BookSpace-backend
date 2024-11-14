import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/mongoAuth";
import booksRoute from "./routes/bookRoutes";
import cors from "cors";

const app: Express = express();
connectDB();

const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.use(booksRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
