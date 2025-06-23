import { Model, model, Schema } from "mongoose";
import { IBorrow, IBorrowMethods } from "./BorrowInterface";
import BookModel from "../book/BookModel";
type BorrowModelType = Model<IBorrow, {}, IBorrowMethods>;

const BorrowSchema = new Schema<IBorrow, BorrowModelType>({
    book : {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    quantity : {
        type: Number,
        required: true,
        min: [0, "quantity must be a positive number"],
        trim: true,
    },
    dueDate : {
        type: Date,
        required: true,
        trim: true,
    }
},
{
    timestamps: true,
    versionKey: false,
});

// Add instance methods to the schema
BorrowSchema.methods.availableCopies = async function () {
  const book = await BookModel.findById(this.book);
  if (!book) {
    throw new Error("Book not found");
  }

  if (book.copies < this.quantity) {
    throw new Error("Not enough copies available");
  }

  // Deduct copies
  book.copies -= this.quantity;
  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();
};

const BorrowModel = model<IBorrow, BorrowModelType>("Borrow", BorrowSchema);

export default BorrowModel;