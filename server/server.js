var express = require('express');
var bodyparser = require('body-parser'); // convert  json string in javascript
var {ObjectID} = require('mongodb');

var{mongoose} = require('./db/mongoose.js');
var {Todo} = require("./model/todo.js");
var{user} = require("./model/user.js");

var app =express();
const port = process.env.PORT || 3000;
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
 app.get('/todos/:id',(req,res)=>{
   var id = req.params.id;
  // res.send(req.params);//req.params contain request made by user
    if(!ObjectID.isValid(id))
      res.status(404).send("sory bud that an invalid id");
  Todo.findById(id).then((todos)=>{
   if(!todos)
     res.status(404).send({});
    else
    res.send({todos});
  }).catch((e)=>res.status(404).send({}));
 });
app.listen(3000,()=>{
 console.log(`started up at${port}`);
});

 module.exports = {app}; // for testing purpose
