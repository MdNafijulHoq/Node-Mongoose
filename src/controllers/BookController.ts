import { Request, Response } from "express";
import BookModel from "../model/book/BookModel";

const createBook = async (req: Request, res: Response) => {
  try {
    const paylaod = req.body;
    const book = new BookModel(paylaod);
    const data = await book.save();
    res.status(201).json({
      success: true,
      message: "Book registered successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Validation failed",
      error,
    });
  }
};

const getAllBook = async (req: Request, res: Response) => {
  try {
    const reqQuery = req.query.genre ? req.query.genre : "";
    console.log(reqQuery);
    let filter = [];
    if (reqQuery) {
      filter = await BookModel.find({ genre: reqQuery })
        .sort({ author: 1 })
        .limit(5);
    } else {
      filter = await BookModel.find().sort({ author: 1 }).limit(5);
    }
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: filter,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Invalid Server Error",
      error,
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    console.log(bookId);
    const book = await BookModel.findById(bookId);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Invalid Server Error",
      error,
    });
  }
};

const updateBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const reqBody = req.body;
    console.log(bookId, reqBody);
    const book = await BookModel.findByIdAndUpdate(bookId, reqBody, {
      new: true,
      runValidators: true,
    });
   
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Invalid Server Error",
      error,
    });
  }
};

const DeleteBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    console.log(bookId);
    await BookModel.findByIdAndDelete(bookId)
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Invalid Server Error",
      error,
    });
  }
};


export default {
  createBook,
  getAllBook,
  getBookById,
  updateBookById,
  DeleteBookById
};
