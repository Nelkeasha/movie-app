const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'fallback-secret-for-dev';

const register = async (email, password) => {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
        email,
        password: hashedPassword,
        bookmarks: []
    });

    // Generate Token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });

    return {
        user: { id: newUser._id, email: newUser.email },
        token
    };
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    return {
        user: { id: user._id, email: user.email },
        token
    };
};

const toggleBookmark = async (userId, movieId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const bookmarkIndex = user.bookmarks.indexOf(movieId);
    let isBookmarked = false;

    if (bookmarkIndex === -1) {
        // Add bookmark
        user.bookmarks.push(movieId);
        isBookmarked = true;
    } else {
        // Remove bookmark
        user.bookmarks.splice(bookmarkIndex, 1);
        isBookmarked = false;
    }

    await user.save();
    return isBookmarked;
};

const getBookmarkedMovies = async (userId) => {
    const user = await User.findById(userId).populate('bookmarks');
    if (!user) throw new Error('User not found');

    // Transform to match frontend expectations (add isBookmarked: true)
    return user.bookmarks.map(movie => ({
        ...movie.toObject(),
        id: movie._id, // Ensure ID is mapped
        isBookmarked: true
    }));
};

module.exports = {
    register,
    login,
    toggleBookmark,
    getBookmarkedMovies,
    SECRET_KEY
};
