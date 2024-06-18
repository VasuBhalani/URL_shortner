const {getUser} = require('../services/user');
async function restrictTologgedInUserOnly(req,res,next)
{//   console.log(res)
    const Useruid = req.cookies?.uid; // we store cookie value in uid
    // console.log(uid)
    if(!Useruid) {                     
        return res.redirect('/login');}

    const user = getUser(Useruid);  // we check uid is signed by secrect key or not
    if(!user) {
        return res.redirect('/login');}
    else
    {
        req.user = user;
        next();
    }    
}

async function checkAuth(req, res, next)
{
    const Useruid = req.cookies?.uid;
    // console.log(uid , " in checkAuth")
    const user = getUser(Useruid);
        req.user = user;
        // console.log(user)
        next();
   
}
module.exports = {restrictTologgedInUserOnly,checkAuth};