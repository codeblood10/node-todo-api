const {mongoose} = require("./../server/db/mongoose.js");
const {ObjectID} = require("mongodb");
const {Todo} = require("./../server/model/todo.js");
const {user} = require("./../server/model/user.js");
var id = "5a46c396fa2c98331cbc8ff9";
var userid = "5a3a0d72eb3587345a1589f4";
if(!ObjectID.isValid(id))
 {
   console.log("id not valid");
 }
/* Todo.find({
 _id: id  // we donot have to create a new object() in mongoose
}).then((todos)=>{
  console.log(todos);
});  // return a todo array

 Todo.findOne({
 _id : id
 }).then((todos)=>{
 console.log(todos);
 });  //return a single document
 */
// findbyidalso return a single document 
 Todo.findById(id).then((todos)=>{
   if(!todos)
 {
   console.log('sorry buddy u entered a wrong id');
 }
   console.log("find by id todo",todos);
 }).catch((e)=> console.log(e));

 user.findById(userid).then((todos)=>{
   if(!todos)
   {
     console.log("sorry buddy u just type the wrong id");
   }
   else
   console.log("user is found",todos);
 }).catch((e)=>console.log(e));
