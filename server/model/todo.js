var mongoose = require('mongoose');
var Todo = mongoose.model('Todo',{
  text :{
          type:String,  // type casting maybe a pitfall
          required : true, //validator
          minlengh : 1,
          trim : true // trim whitespace  for invalid empty string
  },
  completed:{
    type :Boolean,
    default: false
  },
  completedAt:{
    type : Number ,
    default : null
  }});
  // we cannot go  beyond the schema working in mongoose
  /*var newtodo = new Todo({
    text:"whats"
  });
  newtodo.save().then((doc)=>{
   console.log("saved the document",doc);
   }, (e) =>{
     console.log('unable to save todo')
   }
  );*/
  /*var fulltodo  = new Todo({
       text:"lets do this",
       completed:true ,
       completedAt:132,
  });
  fulltodo.save().then((res) => {
    console.log("saved a full document",res);
  },(e) =>{
    console.log("sry buudy we have some problem",e);
  }); */
/*  var other = new Todo ({

  });
  other.save().then((res)=>{
     console.log("saved document");
  },(e)=>{
    console.log("sory bbuddy cant enter a empty todo");
  }); */
module.exports={Todo};
