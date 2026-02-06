const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: String, required: true },
    isBookmarked: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    thumbnail: {
        trending: {
            small: String,
            large: String
        },
        regular: {
            small: String,
            medium: String,
            large: String
        }
    }
});

module.exports = mongoose.model('Movie', movieSchema);
