import express from "express";
const router = express.Router();

import {
  getBooks,
  searchBooksByTitle,
  searchBooksByAuthor,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
} from "../models/books.js";

router.get("/", async function (req, res) {
  if (req.query.search !== undefined) {
    const result = await searchBooksByTitle(req.query.search);
    return res.json({ success: true, payload: result });
  }

  if (req.query.author !== undefined) {
    const result = await searchBooksByAuthor(req.query.author);
    return res.json({ success: true, payload: result });
  }

  const result = await getBooks();
  res.json({ success: true, payload: result });
});

router.get("/:id", async function (req, res) {
  const book = await getBookById(req.params.id);
  res.json({ success: true, payload: book });
});

router.post("/", async function (req, res) {
  const newBook = req.body;
  const result = await createBook(newBook);
  res.json({ success: true, payload: result });
});

router.patch("/:id", async function (req, res) {
  const data = req.body;
  const result = await updateBookById(req.params.id, data);
  res.json({ success: true, payload: result });
});

router.delete("/:id", async function (req, res) {
  const result = await deleteBookById(req.params.id);
  res.json({ success: true, payload: result });
});

export default router;
