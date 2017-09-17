const{MongoClient,ObjectID} = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TOdoApp',(err,db) =>{
  if(err)
  {
   return console.log('sorry buddy there is some problem in the server');
  }

   console.log('connect to mongodb server');
   db.collection("Todos").findOneAndUpdate(
     {_id: new ObjectID("59af51e48b64cd046b65bd55")},
     {
      $set : {
          completed : true
      }
    },{
       returnOriginal : false
     }).then((res)=>{
       console.log(res);
     });
   db.collection("person").findOneAndUpdate(
     {name:"amit"},
      {
        $set : {
          name : "ankit"
       },$inc : {
          age : 2
       }
     },
     {
       returnOriginal : false
     }).then((res)=>{
       console.log(res);
     });
db.close();

});
