const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const data = require('./data');

mongoose.connect('mongodb://127.0.0.1:27017/entertainment-app')
    .then(async () => {
        console.log('Connected to MongoDB');

        // clear existing data
        await Movie.deleteMany({});
        console.log('Cleared existing movies');

        // insert new data
        // data.js has the array, we map it to match schema if needed (but schema likely matches)
        await Movie.insertMany(data);
        console.log('Seeded movies successfully');

        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error seeding data:', err);
        mongoose.connection.close();
    });
