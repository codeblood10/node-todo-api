const{ObjectID} = require('mongodb');
const jwt = require("jsonwebtoken");
const{Todo} = require('./../../model/todo.js');
const{User} = require('./../../model/user.js');
const userid = new ObjectID();
const userid1 = new ObjectID();
const users = [{
  _id : userid,
   email : 'ankitshr8@gmail.com',
   password :"codeblood",
  tokens :[{
  access : "auth",
  token  : jwt.sign({_id:userid.toHexString(),access:'auth'},process.env.JWT_SECRET).toString()
}]
},{
   _id : userid1,
    email :"pappu@gmail.com",
    password :"user2pass",
    tokens :[{
    access : "auth",
    token  : jwt.sign({_id:userid1.toHexString(),access:'auth'},process.env.JWT_SECRET).toString()
  }]

}];



const todos = [{
  _id : new ObjectID(),
  text : "first",
  _creator:userid
},{
  _id : new ObjectID(),
  text :"second",
  completed : true ,
  completedAt : 2314,
  _creator : userid1
}];

const populateTodos = (done)=>{
 // for testing post request
 // Todo.remove({}).then(()=>done()); // we have to remove all the todo from the database to run the test to check whether request id fufilled or not
// for testing get request
 Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>{
    done();
   });
};

const populateUsers = (done)=>{
  User.remove({}).then(()=>{
     var user1 = new User(users[0]).save();
     var user2 = new User(users[1]).save();
   return   Promise.all([user1,user2]);
 }).then(()=> done());
};


module.exports = {todos,populateTodos,users,populateUsers};
