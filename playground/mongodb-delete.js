const{MongoClient,ObjectID} = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TOdoApp',(err,db) =>{
  if(err)
  {
   return console.log('sorry buddy there is some problem in the server');
  }
  console.log('connect to mongodb server');
  //delete many
  /* db.collection("Todos").deleteMany({test:"fucked yesterday"}).then((result)=>{
     console.log(result); */
//   });
  //deleteOne
//  db.collection("Todos").deleteOne({test:"fucked yesterday"}).then((result)=>{
  //  console.log(result);
//  });
//findoneanddelete
//db.collection("Todos").findOneAndDelete({completed:false}).then((result)=>{
   //console.log(result);
//});
  db.collection("person").find().toArray().then((res)=>{
       var ob = new Object();
       for(var i = 0;i<res.length;i++)
       {   var name = res[i].name;
         if(ob[name]== undefined)
           {
             ob[name] = 1 ;
           }
           else
           {
               ob[name]++;
           }
       }
       var j ;
      for(j in ob)
      {
        if(ob[j]>1)
          console.log(j);
      }
   },(err)=>{console.log("sry man some prblm here")});
  db.collection("person").findOneAndDelete({_id: new ObjectID("59ab194679f2d458b8f99d17")})
  .then((res)=>{
    console.log(res);
  });
//db.close();

});
