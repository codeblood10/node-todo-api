const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const validator = require('validator');
const _ = require("lodash");
//user model
var Userschema = new mongoose.Schema({
 email :{
    type:String,
    required :true,
    minlength : 1,
    trim : true,
    unique : true,
    validate : {
        validator : validator.isEmail,
        message : `{value} is not a valid email`
    }
 },
 password : {
    type : String,
    require :true,
    minlength:8
 },
 tokens :[{
     access: {
      type:String,
      required:true
     },
     token :{
      type:String,
      required:true
     }
 }]
});
Userschema.methods.toJSON = function(){
  var user = this;
  var userObject  =  user.toObject();

  return _.pick(userObject,["email","_id"]);
};
Userschema.methods.generateAuthToken = function(){
  var user  = this;  // we dont  use arrow function here because donot binf the function with this
  var access = "auth";
  var token = jwt.sign({_id:user._id.toHexString(),access},"1234").toString();


  user.tokens.push({access,token});
  return user.save().then(()=>{
    return token;
  });
};

Userschema.statics.findByToken = function(token) {
    var User = this;
    var decoded ;
    try
    {
     decoded  = jwt.verify(token,"1234");

   }catch (e) {
    // return new Promises((resolve,reject)=>{
    //   reject();
    // });
     return Promise.reject();
    }
 return   User.findOne({
 "_id" : decoded._id,
 "tokens.token" : token,
 "tokens.access" : "auth"
 }); // quotes are required when we have .   in property
};

 var User = mongoose.model("User",Userschema);
/*var newuser = new  user({
  email:"ankitshr@gmail.com"
});
newuser.save().then((res)=>{
 console.log("task has been completed",res);},(e)=>{
  console.log('sorry buddy u entered some thing wrong');
}); */
module.exports={User};
