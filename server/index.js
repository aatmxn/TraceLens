const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/assets', require('./routes/assets'));
// app.use('/api/detect', require('./routes/detect'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.PORT}`);
        });
    });