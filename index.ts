import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response, NextFunction } from "express";
import assoaciateRoutes from "./routes/associateRoute";
import eventRoute from "./routes/eventRoute";
import yearRoute from "./routes/yearRoute";
import cors from "cors";
import multer from "multer";
import userRoute from "./routes/userRoute";
import { authMiddleware } from "./routes/userRoute";

const app: Application = express();

// Middleware para fazer o parsing do corpo da solicitação como JSON
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(multer().single("profilepic"));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "AssoApp Backend API is running",
    version: "1.0.0",
    endpoints: ["/user", "/associate", "/events", "/year"],
  });
});

// Routes
app.use("/associate", authMiddleware, assoaciateRoutes);
app.use("/events", authMiddleware, eventRoute);
app.use("/year", authMiddleware, yearRoute);
app.use("/user", userRoute);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found"
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
