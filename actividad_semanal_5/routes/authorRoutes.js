import express, { Router } from "express";
import { createAuthor, getAllAuthors, getAuthorsById, updateAuthor, deleteAuthor } from '../controller/authorController.js';

const router = express.Router();

router.post('/', createAuthor);
router.get('/', getAllAuthors);
router.get('/:id', getAuthorsById);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

export default router;
