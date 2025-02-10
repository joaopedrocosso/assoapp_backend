import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
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
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const port = process.env.PORT || 8000;

app.use("/associate", authMiddleware, assoaciateRoutes);
app.use("/events", authMiddleware, eventRoute);
app.use("/year", authMiddleware, yearRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
