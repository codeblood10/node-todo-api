const {mongoose} = require("./../server/db/mongoose.js");
const {ObjectID} = require("mongodb");
const {Todo} = require("./../server/model/todo.js");
const {user} = require("./../server/model/user.js");

Todo.findByIdAndRemove("5a55d7eb9dc6a8d442d44b84").then((todo)=>{
   console.log(todo);
});

/*Todo.remove({}).then((result)=>{
   console.log(result);
});
*/
//Todo.findOneAndRemove
//Todo.findByIdAndRemove
