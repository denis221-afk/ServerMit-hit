const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const RouteCard = require('./Routes/Card')


// Variabels 
const app = express();
const PORT = process.env.PORT || 5000;
const URL = 'mongodb+srv://meat_hit:den4ik17@cluster0.n6qvdeo.mongodb.net/?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());
app.use(RouteCard);

function Start() {
    try{
        mongoose.connect(URL)
        app.listen(PORT, () => {
            console.log(`Server Start on ${PORT}`)
        })
    } catch(e) {
        console.log(e)
    }
}

Start();