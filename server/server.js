var express = require('express');
var bodyparser = require('body-parser'); // convert  json string in javascript

var{mongoose} = require('./db/mongoose.js');
var {Todo} = require("./model/todo.js");
var{user} = require("./model/user.js");

var app =express();

 app.use(bodyparser.json());

 app.post('/todos',(req,res)=>{
   // console.log(req.body);
   var todo = new Todo({
    text : req.body.text
  });
todo.save().then((doc)=>{
   res.send(doc);
},(e)=>{

  res.status(400).send(e);
 });

 });
 app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>
    { res.send({todos});
    },(e)=>{
       res.status(400).send(e);
    });
 });
app.listen(3000,()=>{
 console.log('startes the server');
});

 module.exports = {app}; // for testing purpose
