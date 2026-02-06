const Movie = require('../models/Movie');
const User = require('../models/User');

/**
 * Fetches movies with advanced filtering options.
 * 
 * We build a dynamic Mongoose query object based on provided params.
 * This allows for scalable filtering without fetching all data to memory first.
 * 
 * @param {string} search - Partial match on title
 * @param {number} page - Pagination page
 * @param {number} limit - Items per page
 * @param {string} userId - Used to check bookmark status for the active user
 */
const getAllMovies = async (search, page, limit, category, rating, year, sortBy, userId) => {
    let query = {};

    // 1. Filtering
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }
    if (category) {
        query.category = category;
    }
    if (rating) {
        query.rating = rating;
    }
    if (year) {
        query.year = year;
    }

    // 2. Sorting
    let sortOptions = {};
    if (sortBy) {
        if (sortBy === 'year') sortOptions.year = -1; // Newest first
        if (sortBy === 'title') sortOptions.title = 1; // A-Z
    }

    // 3. Pagination
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 0; // 0 means all
    const skip = (pageNum - 1) * limitNum;

    let moviesQuery = Movie.find(query).sort(sortOptions);

    if (limitNum > 0) {
        moviesQuery = moviesQuery.skip(skip).limit(limitNum);
    }

    const movies = await moviesQuery.exec();
    const total = await Movie.countDocuments(query);

    // 4. Personalization (isBookmarked)
    let userBookmarks = [];
    if (userId) {
        const user = await User.findById(userId);
        if (user && user.bookmarks) {
            userBookmarks = user.bookmarks.map(id => id.toString());
        }
    }

    const personalizedMovies = movies.map(movie => ({
        ...movie.toObject(),
        id: movie._id, // Map _id to id for frontend
        isBookmarked: userId ? userBookmarks.includes(movie._id.toString()) : false
    }));

    if (limitNum > 0) {
        return {
            data: personalizedMovies,
            meta: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum)
            }
        };
    } else {
        return personalizedMovies;
    }
};

const getMovieById = async (id, userId) => {
    try {
        const movie = await Movie.findById(id);
        if (!movie) return null;

        let isBookmarked = false;
        if (userId) {
            const user = await User.findById(userId);
            if (user && user.bookmarks) {
                isBookmarked = user.bookmarks.includes(movie._id);
            }
        }

        return {
            ...movie.toObject(),
            id: movie._id,
            isBookmarked
        };
    } catch (err) {
        // Handle Invalid ID format error
        return null;
    }
};

module.exports = {
    getAllMovies,
    getMovieById
};
