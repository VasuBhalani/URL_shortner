const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const {connectDB} = require("./model/connection");
const cookieParser = require('cookie-parser');

const URL = require("./model/url");
const Users = require("./model/user");

const {restrictTologgedInUserOnly,checkAuth} = require('./middleware/auth');

const urlRoutes = require("./routes/url");
const userRoutes = require("./routes/user"); 
const staticRoute = require("./routes/staticRouter");


const app = express();
const port = 3000

connectDB('mongodb://localhost:27017/URL_Shortener');

app.set("view engine","ejs"); // it tell our view engine that we are using ejs
app.set("views",path.resolve("./views")); // it tell our view files are in views folder


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// restrictTologgedInUserOnly is prevent to access any functionality like genrate shorturl .... without login
app.use('/url',restrictTologgedInUserOnly,urlRoutes);  // in this we use inline middleware
app.use('/user',userRoutes);
app.use('/',checkAuth,staticRoute);

app.listen(port,()=>{console.log(`server is running on port ${port}`)});
