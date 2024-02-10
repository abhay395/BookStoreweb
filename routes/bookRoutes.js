import { Book } from "../models/bookModel.js";
import express from "express";

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    // // console.log(req.body)
    if (!req.body.title || !req.body.author || !req.body.publisherYear) {
      return res.status(400).send({
        message: "send all required fields :title, author , publisYear a ",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publisherYear: req.body.publisherYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findById(id);
    return res.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.title || !req.body.author || !req.body.publisherYear) {
      return res.status(400).send({
        message: "send all required fields :title, author , publisYear a ",
      });
    }
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: "book not found" });
    }
    return res.status(200).send({ message: "Book updated" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "book not found " });
    }
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
