const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 9000;
const {user, product, cart} = require('./models/model.js');

const url = 'mongodb://localhost:27017/e-comm'

mongoose.connect(url);

const con = mongoose.connection;

con.on('open', () => {

    console.log('connected...');
})

app.use(express.json());

const modelRouter = require('./routes/api.js')
app.use('/api',modelRouter);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})