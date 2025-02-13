const Book = require("../models/book");
const Genre = require("../models/genre");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("genre", "name");
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("genre", "name")
      .sort({ createdAt: -1 });

    if (!book) {
      return res.status(404).json({ msg: "Books not found" });
    }

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.createBook = async (req, res) => {
  const { title, author, genre, description } = req.body;

  try {
    const genreExists = await Genre.findById(genre);

    if (!genre) {
      return res.status(400).json({ msg: "Genre not found!" });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      description,
    });

    const book = await newBook.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateBook = async (req, res) => {
  const { title, author, genre, description } = req.body;

  try {
    // Find book and validate existence
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    // Handle genre update if provided
    if (genre) {
      const genreExists = await Genre.findById(genre);
      if (!genreExists) {
        return res.status(400).json({
          msg: "Genre not found",
        });
      }
      book.genre = genre;
    }

    // Update other fields if provided
    if (title) book.title = title;
    if (author) book.author = author;
    if (description) book.description = description;

    // Save changes
    await book.save();

    // Return updated book with populated genre
    const updatedBook = await Book.findById(book._id).populate("genre", "name");

    res.json({
      msg: "Book updated successfully",
      book: updatedBook,
    });
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({
      msg: "Server Error",
      error: err.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    await book.deleteOne();

    res.json({ msg: "Book removed!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
