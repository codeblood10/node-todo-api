const{MongoClient,ObjectID} = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TOdoApp',(err,db) =>{
  if(err)
  {
   return console.log('sorry buddy there is some problem in the server');
  }
  console.log('connect to mongodb server');

  db.collection('Todos').find({name:"bankit"}).toArray().then((docs)=>{
    console.log("Todos");
    console.log(JSON.stringify(docs,undefined,2));
  },(err)=>
  {
    console.log("sorry bud cannot fetch",err);
  }); // toArray return a promise odf array of objects
  db.collection('Todos').find({
    _id :new ObjectID( "59af51e48b64cd046b65bd55")
  }).toArray().then((docs)=>{
    console.log("Todos");
    console.log(JSON.stringify(docs,undefined,2));
  },(err)=>
  {
    console.log("sorry bud cannot fetch",err);
  });
  db.collection('Todos').find().count().then((count)=>{
    console.log(`Todos:${count}`);

  },(err)=>
  {
    console.log("sorry bud cannot fetch",err);
  });
  db.collection("person").find({name:"ankit"}).count().then((cnt)=>{
   console.log(`${cnt}`)},(err) =>{
     console.log("got some error", err);
  });
//db.close();

});
