const mongoose = require('mongoose');
const Account = mongoose.model('accountSchema');


module.exports = app =>{

app.post('/signin', async (req, res) => {
    console.log(req.body);

    const rUsername = req.body.username; 
    const rPassword = req.body.password; 

    var userAccount = await Account.findOne({username: rUsername});
    
    if(userAccount == null )
    {
        userAccount.lastAuthentication = Date.now();
        await userAccount.save();
        res.json({ token:null ,isSuccess: false});
        console.log("Hesap yok");
    }
    else
    {
        res.json({token:null, isSuccess: true});
        console.log("Hesap var");
    } 

});
}