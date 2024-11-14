"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
const booksRoute = express_1.default.Router();
booksRoute.get("/books", bookController_1.getBooks);
booksRoute.post("/books", bookController_1.saveBooks);
booksRoute.delete("/books/:id", bookController_1.deleteBook);
exports.default = booksRoute;
