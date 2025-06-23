import { Router } from "express";
import BookController from "../controllers/BookController";
import BorrowController from "../controllers/BorrowController";

const router = Router();

router.post("/books", BookController.createBook);
router.post("/borrow", BorrowController.BorrowBook);
router.get("/books", BookController.getAllBook);
router.get("/books/:bookId", BookController.getBookById);
router.put("/books/:bookId", BookController.updateBookById);
router.delete("/books/:bookId", BookController.DeleteBookById);
router.get("/borrow", BorrowController.getBorrowSummary);

export default router;