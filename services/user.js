// // it is recored in which we store the data of logged in user
const jwt = require('jsonwebtoken');
const scrateKey = 'i!n&drctgi~`a%0)';
function setUser(user)
{
    return  jwt.sign({ id : user._id, email:user.email}, scrateKey);
}

function getUser(token)
{
 if(!token) return null
 try{
    //  console.log(jwt.verify(token, scrateKey)," in getUser");
     return jwt.verify(token, scrateKey);
 }catch(err){
 if(!user) return null
 }
}


// const setUserMap = new Map();


// function setUser(id,user)
// {
//     setUserMap.set(id,user);
// }

// function getUser(id)
// {
//     return setUserMap.get(id);
// }

// module.exports = {setUser,getUser}


 module.exports = {setUser,getUser}