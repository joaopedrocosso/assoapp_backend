"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const associateRoute_1 = __importDefault(require("./routes/associateRoute"));
const eventRoute_1 = __importDefault(require("./routes/eventRoute"));
const yearRoute_1 = __importDefault(require("./routes/yearRoute"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const userRoute_2 = require("./routes/userRoute");
const app = (0, express_1.default)();
// Middleware para fazer o parsing do corpo da solicitação como JSON
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use((0, multer_1.default)().single("profilepic"));
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
const port = process.env.PORT || 8000;
app.use("/associate", userRoute_2.authMiddleware, associateRoute_1.default);
app.use("/events", userRoute_2.authMiddleware, eventRoute_1.default);
app.use("/year", userRoute_2.authMiddleware, yearRoute_1.default);
app.use("/user", userRoute_1.default);
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
