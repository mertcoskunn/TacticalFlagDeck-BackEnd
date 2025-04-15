const mongoose = require('mongoose');
const Account = mongoose.model('accountSchema');


module.exports = app =>{

app.post('/signup', async (req, res) => {
    console.log(req.body);

    const rUsername = req.body.username; 
    const rPassword = req.body.password; 

    var userAccount = await Account.findOne({username: rUsername});
    
    if(userAccount == null )
    {
        var newAccount = new Account({
            username : rUsername,
            password : rPassword,
            
            lastAuthentication: Date.now()
        });

        await newAccount.save();

        res.json({userName:rUsername, isSuccess: true});
    }
    else
    {
        res.json({userName:rUsername, isSuccess: false});
        console.log("Hesap var");
    }
});
}