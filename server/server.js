require("./config/config.js");

const _ = require('lodash');
var express = require('express');
var bodyparser = require('body-parser'); // convert  json string in javascript
var {ObjectID} = require('mongodb');

var{mongoose} = require('./db/mongoose.js');
var {Todo} = require("./model/todo.js");
var{user} = require("./model/user.js");

var app = express();
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
  }).catch((e)=>res.status(400).send(e));
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

app.delete('/todos/:id',(req,res)=>{
   var id = req.params.id;

   if(!ObjectID.isValid(id))
     res.status(404).send("sorry bud u enterd a invalid id");
   Todo.findByIdAndRemove(id).then((todos)=>{
     if(!todos)
       {
           res.status(404).send("sorry bud you request in invalid");
       }
    else
        res.send({todos});

   }).catch((e)=>res.status(404).send("not your fault some system eroor"));
});

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,["text","completed"]); //we have to pick the selected property that user is allowed to update
  if(!ObjectID.isValid(id))
   {
     return res.status(404).send();
   }
   if(_.isBoolean(body.completed)&&body.completed)
    {
      body.completedAt = new Date().getTime();
    }
    else
    {
       body.completed = false ;
       body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id,{$set:body},{new :true}).then((todo)=>{
      if(!todo)
      {
        return res.status(404).send();
      }
      res.send({todo});
    }).catch((e)=>{
          res.status(404).send();
    })

 });



app.listen(port,()=>{
 console.log(`started up at${port}`);
});

 module.exports = {app}; // for testing purpose
