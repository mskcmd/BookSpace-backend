"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = getBooks;
exports.saveBooks = saveBooks;
exports.deleteBook = deleteBook;
const bookModel_1 = require("../model/bookModel");
function getBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield bookModel_1.BookModel.find();
            if (!books || books.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Books are not available",
                });
            }
            return res.status(200).json({
                success: true,
                data: books,
            });
        }
        catch (error) {
            console.error('Error retrieving books:', error);
            return res.status(500).json({
                success: false,
                message: 'Error retrieving books',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    });
}
function isTitleExists(title) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingBook = yield bookModel_1.BookModel.findOne({ title });
        return !!existingBook;
    });
}
function saveBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, author, description } = req.body;
            if (!title || !author || !description) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide title, author and description"
                });
            }
            if (yield isTitleExists(title)) {
                return res.status(400).json({
                    success: false,
                    message: "A book with this title already exists"
                });
            }
            const newBook = new bookModel_1.BookModel({
                title,
                author,
                description
            });
            const saveBook = yield newBook.save();
            return res.status(200).json({
                success: true,
                data: saveBook,
                message: "Book added succussfully"
            });
        }
        catch (error) {
            console.error('Error saving book:', error);
            return res.status(500).json({
                success: false,
                message: 'Error saving book',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    });
}
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield bookModel_1.BookModel.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).json({ message: "Book not found" });
            }
            return res.status(200).json({ message: "Book deleted successfully", deletedBook: result });
        }
        catch (error) {
            console.error("Error deleting book:", error);
            return res.status(500).json({ message: "Internal server error", error });
        }
    });
}
