import { model, Schema } from "mongoose";
import { IBook } from "./BookInterface";

const BookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        required: true,
        trim: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, "ISBN must be unique"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        default: "",
    },
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies must be a positive number"],
        trim: true,
    },
    available: {
        type: Boolean,
        default: true,
    }
},
{
    timestamps: true,
    versionKey: false,
});

const BookModel = model<IBook>("Book", BookSchema);

export default BookModel;