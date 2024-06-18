const User = require("../model/user");
const {v4 : uuidv4} = require('uuid'); 
const {setUser,getUser} = require('../services/user');
async function createUser(req, res) {
    // console.log("I am in singup page")
    const {name,email,password} = req.body;
    // console.log(name,email,password)

    if(!name || !email || !password){
        return res.status(400).json({error:"All fields are required"})
    }

    const exist = await User.findOne({email});
    if(exist){
        return res.status(400).json({error:"User already exists"})
    }
    const user = await User.create({
        name,
        email,
        password
    }); 

    return res.redirect('/login');// login ave
}

async function handleLogin(req, res) {
    // console.log("I am in login page")
    const {email,password} = req.body;
    // console.log("emial - ",email,"password -",password)

    if(!email || !password){
        return res.status(400).render('login', { error: "All fields are required" });
    }

    const exist = await User.findOne({email});
    if(!exist){
        return res.status(404).render('login',{error:"User does not exist"});
    }else if(exist.password !== password){
        return res.status(401).render('login',{error:"Incorrect password"});
    }else
    {
        // const sessionId = uuidv4()

        const token=setUser(exist)
        console.log("token in handleLogin :- ",token)
        // console.log(sessionId," made in handle login")
        res.cookie('uid',token)  
        return res.redirect('/');
    }

}

module.exports = {
    createUser,handleLogin
}
