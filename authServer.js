const express = require('express');
const keys = require('./config/keys.js');
const cors = require('cors');

const app = express();



app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));



const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);

require('./models/Account');

require('./routes/signInRoute.js')(app);
require('./routes/signUpRoute.js')(app);




app.listen(keys.auth_port, ()=>{
    console.log("Listening on "+ keys.auth_port); 
}); 



