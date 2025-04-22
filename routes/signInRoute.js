const mongoose = require('mongoose');
const Account = mongoose.model('accountSchema');


module.exports = app =>{

app.post('/signin', async (req, res) => {

    const rUsername = req.body.username; 
    const rPassword = req.body.password; 

    var userAccount = await Account.findOne({username: rUsername});
    
    if(userAccount == null )
    {
        
        res.json({ token:null ,isSuccess: false});
        console.log("User not found");
    }
    else
    {
        res.json({token:null, isSuccess: true});
        console.log("User found");
    } 

});
}