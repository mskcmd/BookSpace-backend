import { Request, Response } from "express";
import { BookModel } from "../model/bookModel";

export async function getBooks(req: Request, res: Response): Promise<any> {
    try {
        const books = await BookModel.find();

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

    } catch (error) {
        console.error('Error retrieving books:', error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving books',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}

async function isTitleExists(title: string): Promise<boolean> {
    const existingBook = await BookModel.findOne({ title });
    return !!existingBook; 
}

export async function saveBooks(req: Request, res: Response): Promise<any> {
    try {
        const { title, author, description } = req.body
        if (!title || !author || !description) {
            return res.status(400).json({
                success: false,
                message: "Please provide title, author and description"
            })
        }

        if (await isTitleExists(title)) {
            return res.status(400).json({
                success: false,
                message: "A book with this title already exists"
            });
        }

        const newBook = new BookModel({
            title,
            author,
            description
        })

        const saveBook = await newBook.save()

        return res.status(200).json({
            success: true,
            data: saveBook,
            message: "Book added succussfully"
        })

    } catch (error) {
        console.error('Error saving book:', error);
        return res.status(500).json({
            success: false,
            message: 'Error saving book',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

export async function deleteBook(req: Request, res: Response): Promise<any> {
    try {
        const { id } = req.params;
        const result = await BookModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ message: "Book deleted successfully", deletedBook: result });
    } catch (error) {
        console.error("Error deleting book:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
}