require("./config/config.js");
const bcrypt = require('bcryptjs');
const _ = require('lodash');
var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser'); // convert  json string in javascript
var {ObjectID} = require('mongodb');

var{mongoose} = require('./db/mongoose.js');
var {Todo} = require("./model/todo.js");
var{User} = require("./model/user.js");
var{adahar} = require("./model/adahar.js");
var {authenticate} = require("./middleware/authenticate.js");

var app = express();
const port = process.env.PORT || 3000;
 app.use(bodyparser.json());
 app.use(cors());
 app.post('/todos',authenticate,(req,res)=>{
   // console.log(req.body);
   var todo = new Todo({
    text : req.body.text,
    _creator:req.user._id
  });
todo.save().then((doc)=>{
   res.send(doc);
},(e)=>{
   res.status(400).send(e);
 });
 });
app.post("/adahar/check",(req,res)=>{
   console.log(req.body);

   adahar.findOne(req.body).then((todos)=>{
    if(!todos)
      res.status(404).send({validated :"fail"});
     else
     res.send({validated:"pass"});
   }).catch((e)=>res.status(404).send({}));
});
app.get("/adahar",(req,res)=>{
  adahar.find().then((todos)=>{
   if(!todos)
     res.status(404).send({});
    else
    res.send({todos});
  }).catch((e)=>res.status(404).send({}));
});
app.post("/adahar",(req,res)=>{
   var body = {name:req.body.name,uid:req.body.uid};
   var entry = new adahar(body);
   entry.save().then((user)=>{
   if(!user)
     res.status(404).send({});
     else
      res.send({user});
   }).catch((e)=>res.status(404).send({}));
});
app.post('/users',(req,res)=>{

    var user = new User(_.pick(req.body,["email","password"]));
    user.save().then((user)=>{
      return user.generateAuthToken();
      //res.send(doc);  we chain the promises
    }).then((token)=>{
      res.header('x-auth',token).send(user);
    }).catch((e)=>{
      res.status(400).send(e);
    })

});

app.post('/users/login',(req,res)=>{
    var body =  {email:req.body.email,password:req.body.password};

    User.findByCredentials(body.email,body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{           //return is used to catch error in single catch keep the chain alive
              res.header('x-auth',token).send(user);
           });
    }).catch((e)=>{
      res.status(400).send("can't find you buudy");
    });
});

app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
});
app.delete('/users/me/token',authenticate,(req,res)=>{
     req.user.removeToken(req.token).then(()=>{
       res.status(200).send();
     },()=>{
       re.status(400).send();
     });
});
 app.get('/todos',authenticate,(req,res)=>{
    Todo.find({_creator : req.user._id}).then((usertodos)=>
    {

      res.send({usertodos});
  }).catch((e)=>res.status(400).send(e));
 });
 app.get('/todos/:id',authenticate,(req,res)=>{
   var id = req.params.id;
  // res.send(req.params);//req.params contain request made by user
    if(!ObjectID.isValid(id))
      res.status(404).send("sory bud that an invalid id");
  Todo.findOne({
    _id:id,_creator:req.user._id
  }).then((todos)=>{
   if(!todos)
     res.status(404).send({});
    else
    res.send({todos});
  }).catch((e)=>res.status(404).send({}));
 });

app.delete('/todos/:id',authenticate,(req,res)=>{
   var id = req.params.id;

   if(!ObjectID.isValid(id))
     res.status(404).send("sorry bud u enterd a invalid id");
   Todo.findOneAndRemove({  _id:id,_creator:req.user._id}).then((todos)=>{
     if(!todos)
       {
            res.status(404).send("sorry bud you request in invalid");
       }
    else
        res.send({todos});

   }).catch((e)=>{res.status(404).send("not your fault some system error")});
});

app.patch('/todos/:id',authenticate,(req,res)=>{
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
    Todo.findOneAndUpdate({  _id:id,_creator:req.user._id},{$set:body},{new :true}).then((todo)=>{
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
