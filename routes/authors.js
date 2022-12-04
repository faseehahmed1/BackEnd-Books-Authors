import express from "express";
const router = express.Router();

import {
  getAuthors,
  searchAuthorByName,
  getAuthorById,
  createAuthor,
  updateAuthorById,
  deleteAuthorById,
} from "../models/authors.js";

router.get("/", async function (req, res) {
  if (req.query.name !== undefined) {
    const searchedAuthors = await searchAuthorByName(req.query.name);
    return res.json({ success: true, payload: searchedAuthors });
  }

  const authors = await getAuthors();
  res.json({ success: true, payload: authors });
});

router.get("/:id", async function (req, res) {
  const author = await getAuthorById(req.params.id);
  console.log(author)
  if (author !== undefined) {
    res.json({ success: true, payload: author });
  } 
  else {
    const author = [{ "title": "Does Not Exist!" }]
    res.json({ success: true, payload: author });
  }
  
});

router.post("/", async function (req, res) {
  // const data = req.body;
  const newAuthor = await createAuthor(req.body);
  res.json({ success: true, payload: newAuthor });
});

router.patch("/:id", async function (req, res) {
  // const data = req.body;
  const updatedAuthor = await updateAuthorById(req.params.id, req.body);
  res.json({ success: true, payload: updatedAuthor });
});

router.delete("/:id", async function (req, res) {
  const deletedAuthor = await deleteAuthorById(req.params.id);
  res.json({ success: true, payload: deletedAuthor });
});

export default router;
