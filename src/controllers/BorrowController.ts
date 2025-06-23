import { Request, Response } from "express";
import BorrowModel from "../model/borrow/BorrowModel";

const BorrowBook = async (req : Request, res : Response) => {
   try {
    const payload = req.body;

    // Create a borrow instance
    const borrow = new BorrowModel(payload);
    // Call instance method to handle book logic
    await borrow.availableCopies();
    // save borrow record
    const data = await borrow.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data,
    });
  }  catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        message: "Validation failed",
        error,	    
    })}
};

const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    
    const summary = await BorrowModel.aggregate([
      {
        $group: {
          _id: "$book", 
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    console.error("Aggregation Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

export default {
    BorrowBook,
    getBorrowSummary,
}