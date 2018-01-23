//const MongoClient = require("mongodb").MongoClient;
const{MongoClient,ObjectID} = require("mongodb"); ///object destructring
var obj = new ObjectID();
console.log(obj);
// object destructring lets you pull out properties  in variable
var user  = {name:"ankit",age:21};
var {name} = user;
console.log(name);
// we don not create database in mongodb first just call it but mongodb create a database when we add thing in it.
MongoClient.connect("mongodb://localhost:27017/TOdoApp",(err,db)=>{
    if(err)
    {
    return console.log("unable  to connect mongodb server");

    }
    console.log("connected to mongo server");
/*
db.collection('Todos').insertOne({
  // use _id to set custom id
   test : "something to do",
   completed :false
},(err,res)=>{
    if(err)
      {
        return console.log("cant connect");
      }
      console.log(JSON.stringify(res.ops,undefined,2));
});

db.collection('person').insertOne({
     name : "ankit",
     age  : 21 ,
     location :"jhansi"
},(err,res)=>{
    if(err)
      {
        return console.log("cant connect");
      }
      console.log(JSON.stringify(res.ops,undefined,2));
      console.log(res.ops[0]._id.getTimestamp()); //time and date of a document
}); */
   db.close();

});
