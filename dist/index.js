"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoAuth_1 = require("./config/mongoAuth");
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
(0, mongoAuth_1.connectDB)();
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: allowedOrigin,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Server is running");
});
app.use(bookRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
