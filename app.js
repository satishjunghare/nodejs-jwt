const express = require('express');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const mongoose = require('mongoose');
require('dotenv').config();
// const protectedRoute = require('./routes/protected');

mongoose.connect('mongodb://localhost:27017/nodejwt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection established');
}).catch((error) => {
    console.error(`Error connecting to mongodb :`, error);
});

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});