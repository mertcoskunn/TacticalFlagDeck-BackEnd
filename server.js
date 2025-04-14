const express = require('express');
const keys = require('./conig/keys.js');

const app = express();


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');


app.get('/auth', async (req, res) => {
    console.log(req.params);
    res.send("Hello world! It is "+ Date.now());

});



const port = 13756;

app.listen(port, ()=>{
    console.log("Listening on "+ port); 
}); 



