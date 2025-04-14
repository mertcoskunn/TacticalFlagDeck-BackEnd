const express = require('express');
const keys = require('./config/keys.js');

const app = express();


const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);


require('./models/Account');
const Account = mongoose.model('accountSchema');


app.get('/account', async (req, res) => {
    const {rUsername, rPassword} = req.query; 

    console.log(rUsername);
    console.log(rPassword);


    var userAccount = await Account.findOne({username: rUsername}); 

    if(userAccount == null )
    {
        console.log("Create new account"); 

        var newAccount = new Account({
            username : rUsername,
            password : rPassword,
            
            lastAuthentication: Date.now()

        });

        await newAccount.save();
        
        res.send(newAccount);
        return;
    }else{
        if(rPassword == userAccount.password)
        {
            userAccount.lastAuthentication = Date.now();
            await userAccount.save();
            
            res.send(userAccount);
            console.log("burdayımmm burdaaa ");
            return;  
        }
    }
});



const port = 13756;

app.listen(port, ()=>{
    console.log("Listening on "+ port); 
}); 



