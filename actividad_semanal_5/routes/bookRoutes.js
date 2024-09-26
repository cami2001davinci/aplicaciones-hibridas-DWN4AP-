import express, { Router } from "express";
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../controller/bookController.js';

const router = express.Router();

router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
