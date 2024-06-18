const  mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true  
},
  password : {
    type : String,
    required : true
  }
},{timestamps:true});

const Users= new mongoose.model('Users',userSchema);

module.exports = Users;