const mongoose = require('mongoose');

async function connectDB(url) {
    return await mongoose.connect(url)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err.message));
}

module.exports = { connectDB };


