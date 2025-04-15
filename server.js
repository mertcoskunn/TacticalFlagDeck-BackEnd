const express = require('express');
const keys = require('./config/keys.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));



const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);

require('./models/Account');

require('./routes/authRoutes')(app);



const port = 13756;

app.listen(port, ()=>{
    console.log("Listening on "+ port); 
}); 



