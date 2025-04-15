const mongoose = require('mongoose');
const Account = mongoose.model('accountSchema');


module.exports = app =>{

app.post('/account', async (req, res) => {
    console.log(req.body);

    const rUsername = req.body.username; 
    const rPassword = req.body.password; 

    var userAccount = await Account.findOne({username: rUsername});
    
    if(userAccount == null )
    {
        res.json({ token:null ,success: false});
    }
    else
    {
        res.json({token:null, success: true});
        console.log("Hesap var");
    }


    //console.log(req);
    //res.json(req.body);
    /*
    const {rUsername, rPassword} = req.query; 

    console.log(rUsername);
    console.log(rPassword);


    var userAccount = await Account.findOne({username: rUsername}); 

    if(userAccount == null )
    {
        console.log("Invalid username or password"); 

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
        else
        {
            console.log("Invalid username or password")
        }
    }
}*/

});
}