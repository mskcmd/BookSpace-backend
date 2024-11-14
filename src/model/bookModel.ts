import mongoose, { Schema, Document } from 'mongoose';

interface IBook extends Document {
    title: string;
    author: string;
    description: string;
    createdAt: Date;
}

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const BookModel = mongoose.model<IBook>('Book', bookSchema);