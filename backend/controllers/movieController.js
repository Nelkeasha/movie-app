const movieService = require('../services/movieService');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../services/userService');

// Helper to get user ID from token optionally (for public routes)
const getUserIdFromRequest = (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded.id;
    } catch (err) {
        return null;
    }
};

const getMovies = async (req, res) => {
    try {
        const { search, page, limit, category, rating, year, sortBy } = req.query;
        const userId = getUserIdFromRequest(req); // Optional Auth
        const movies = await movieService.getAllMovies(search, page, limit, category, rating, year, sortBy, userId);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movies', error: error.message });
    }
};

const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = getUserIdFromRequest(req); // Optional Auth
        const movie = await movieService.getMovieById(id, userId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movie', error: error.message });
    }
};

const toggleBookmark = async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.user.id; // Guaranteed by authMiddleware

        const isBookmarked = await userService.toggleBookmark(userId, id);

        res.status(200).json({ success: true, isBookmarked });
    } catch (error) {
        res.status(500).json({ message: 'Error toggling bookmark', error: error.message });
    }
};

const getBookmarkedMovies = async (req, res) => {
    try {
        const userId = req.user.id; // Guaranteed by authMiddleware
        const movies = await userService.getBookmarkedMovies(userId);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookmarked movies', error: error.message });
    }
};

module.exports = {
    getMovies,
    getMovieById,
    toggleBookmark,
    getBookmarkedMovies
};
