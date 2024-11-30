const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: {
    type: String,
    required: [true, "Genre name is required"],
    unique: true,
    trim: true,
    minlength: [2, "Genre name must be at least 2 characters long"],
    maxlength: [50, "Genre name cannot exceed 50 characters"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s-]+$/.test(v);
      },
      message: "Genre name can only contain letters, spaces and hyphens",
    },
  },
});

// Capitalize first letter of each word before saving
genreSchema.pre("save", function (next) {
  if (this.name) {
    // Split string into words, capitalize each word, join back
    this.name = this.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  next();
});

// Add index for name field
genreSchema.index({ name: 1 });

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
