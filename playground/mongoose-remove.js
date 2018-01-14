const {mongoose} = require("./../server/db/mongoose.js");
const {ObjectID} = require("mongodb");
const {Todo} = require("./../server/model/todo.js");
const {user} = require("./../server/model/user.js");

Todo.findByIdAndRemove("5a591123b3d9630df4aaf627").then((todo)=>{
   console.log(todo);
});

/*Todo.remove({}).then((result)=>{
   console.log(result);
});
*/
//Todo.findOneAndRemove
//Todo.findByIdAndRemove
