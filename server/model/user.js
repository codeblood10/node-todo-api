var mongoose = require('mongoose');
//user model
 var user = mongoose.model("user",{
  email :{
     type:String,
     required :true,
     minlength : 1,
     trim : true
  }
 });
/*var newuser = new  user({
  email:"ankitshr@gmail.com"
});
newuser.save().then((res)=>{
 console.log("task has been completed",res);},(e)=>{
  console.log('sorry buddy u entered some thing wrong');
}); */
module.export={user};
