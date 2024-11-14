import express, { Router } from "express";
import { deleteBook, getBooks, saveBooks } from "../controller/bookController";

const booksRoute: Router = express.Router()

booksRoute.get("/books",getBooks)
booksRoute.post("/books",saveBooks)
booksRoute.delete("/books/:id", deleteBook); 


export default booksRoute