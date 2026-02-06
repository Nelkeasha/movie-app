const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const authenticateToken = require('../middleware/authMiddleware');

// GET /api/entertainment (Public)
router.get('/', movieController.getMovies);

// GET /api/entertainment/bookmarked (Protected)
router.get('/bookmarked', authenticateToken, movieController.getBookmarkedMovies);

// GET /api/entertainment/:id (Public)
router.get('/:id', movieController.getMovieById);

// POST /api/entertainment/bookmark (Protected)
router.post('/bookmark', authenticateToken, movieController.toggleBookmark);

module.exports = router;
