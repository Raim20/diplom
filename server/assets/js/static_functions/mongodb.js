const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://29152:raimmega02@cluster0.xxy3ajy.mongodb.net/data_of_store?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

module.exports = mongoose.connection;
