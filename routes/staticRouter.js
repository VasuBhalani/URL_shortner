const express = require('express');
const router = express.Router();
const URL = require('../model/url');

router.get('/',async (req,res)=>{
       // console.log("helloo")
       // it is done because of checkauth middleware :- 
       if(!req.user) return res.redirect('/login')
       const urls= await URL.find({createdBy : req.user.id})  
       console.log(urls)
    res.render('home',{urls: urls})
})
 
router.get('/signup',(req,res)=>{
       res.render('signup')
})

router.get('/login',(req,res)=>{
       res.render('login')
})

module.exports = router