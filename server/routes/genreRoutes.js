const express = require("express");
const { check } = require("express-validator");
const genreController = require("../controllers/genreController");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: Genre management
 */

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Get all genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: Genres retrieved successfully
 *       400:
 *         description: Bad request
 */
router.get("/", genreController.getAllGenres);

// /**
//  * @swagger
//  * /genres/{id}:
//  *   get:
//  *     summary: Get genre by ID
//  *     tags: [Genres]
//  *     security:
//  *       - ApiKeyAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Genre ID
//  *     responses:
//  *       200:
//  *         description: Genre retrieved successfully
//  *       404:
//  *         description: Genre not found
//  */
// router.get("/:id", genreController.getGenreById);

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Genre created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/",
  [
    auth,
    [
      check("name")
        .trim()
        .notEmpty()
        .withMessage("Genre name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Genre name must be between 2 and 50 characters")
        .matches(/^[a-zA-Z\s-]+$/)
        .withMessage("Genre name can only contain letters, spaces and hyphens"),
    ],
  ],
  genreController.createGenre
);

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     summary: Update a genre
 *     tags: [Genres]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Genre ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Genre updated successfully
 *       404:
 *         description: Genre not found
 */
router.put(
  "/:id",
  [
    auth,
    [
      check("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Genre name must be between 2 and 50 characters")
        .matches(/^[a-zA-Z\s-]+$/)
        .withMessage("Genre name can only contain letters, spaces and hyphens"),
    ],
  ],
  genreController.updateGenre
);

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     summary: Delete a genre
 *     tags: [Genres]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Genre ID
 *     responses:
 *       200:
 *         description: Genre deleted successfully
 *       404:
 *         description: Genre not found
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    // Check if genre is used by any books before deletion
    // const booksWithGenre = await Book.find({ genre: req.params.id });
    // if (booksWithGenre.length > 0) {
    //   return res.status(400).json({
    //     msg: "Cannot delete genre that is assigned to books",
    //   });
    // }
    genreController.deleteGenre(req, res);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
