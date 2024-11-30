const Genre = require("../models/genre");

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// exports.getGenreById = async (req, res) => {
//   try {
//     const genre = await Genre.findById(req.params.id);

//     if (!genre) {
//       return res.status(404).json({ msg: "Genre not found" });
//     }

//     res.json(genre);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

exports.createGenre = async (req, res) => {
  const { name } = req.body;

  try {
    let genre = await Genre.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });

    if (genre) {
      return res.status(400).json({ msg: "Genre name already exists" });
    }

    const newGenre = new Genre({
      name,
    });

    genre = await newGenre.save();
    res.json(genre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateGenre = async (req, res) => {
  const { name } = req.body;

  try {
    let genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).json({ msg: "Genre not found!" });
    }

    if (name) {
      genre.name = name;
    }
    await genre.save();

    res.json({ msg: "Genre updated!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).json({ msg: "Genre not found" });
    }

    await genre.deleteOne();

    res.json({ msg: "Genre removed!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
