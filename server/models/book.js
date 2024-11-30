const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [2, "Book title must be at least 2 characters long"],
    maxlength: [50, "Book title cannot exceed 50 characters"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s-]+$/.test(v);
      },
      message: "Book title can only contain letters, spaces and hyphens",
    },
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
    required: [true, "Genre is required"],
  },
  status: {
    type: String,
    enum: ["Want to Read", "Reading", "Read"],
    required: [true, "Reading status is required"],
    default: "Want to Read",
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
});

// Book schema pre-save middleware
bookSchema.pre("save", function (next) {
  // Helper function for title/author capitalization with special cases
  const capitalizeTitleOrAuthor = (str) => {
    const lowercaseWords = [
      "a",
      "an",
      "the",
      "and",
      "but",
      "or",
      "for",
      "nor",
      "on",
      "at",
      "to",
      "for",
      "with",
      "in",
    ];

    return str
      .split(" ")
      .map((word, index) => {
        // Always capitalize first and last word
        if (index === 0 || index === str.split(" ").length - 1) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        // Check if word should be lowercase
        if (lowercaseWords.includes(word.toLowerCase())) {
          return word.toLowerCase();
        }
        // Capitalize word
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  // Helper function for description sentences
  const capitalizeFirstLetterOfSentences = (str) => {
    return str
      .split(". ")
      .map((sentence) => {
        if (sentence.length > 0) {
          return sentence.charAt(0).toUpperCase() + sentence.slice(1);
        }
        return sentence;
      })
      .join(". ");
  };

  // Apply capitalization rules
  if (this.title) {
    this.title = capitalizeTitleOrAuthor(this.title);
  }

  if (this.author) {
    this.author = capitalizeTitleOrAuthor(this.author);
  }

  if (this.description) {
    this.description = capitalizeFirstLetterOfSentences(this.description);
  }

  next();
});

// indexes for common queries
bookSchema.index({ title: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ genre: 1 });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
