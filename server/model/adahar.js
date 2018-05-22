const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const validator = require('validator');
const _ = require("lodash");
const bcrypt = require("bcryptjs");
//adahar model
var adaharschema = new mongoose.Schema({
 name :{
    type:String,
    required :true,
    minlength : 1,
    trim : true,
 },
 uid : {
    type : Number,
    require :true,
    minlength:12
 }
});

 var adahar = mongoose.model("adahar",adaharschema);
/*var newuser = new  user({
  email:"ankitshr@gmail.com"
});
newuser.save().then((res)=>{
 console.log("task has been completed",res);},(e)=>{
  console.log('sorry buddy u entered some thing wrong');
}); */
module.exports={adahar};
