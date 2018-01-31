var env = process.env.NODE_ENV || 'development';
console.log('env *****', env);

if(env === 'development'|| env === 'test' )
{
  var config = require("./config.json"); //json file are autoparsed when we  require them do not need to do json.parse
  var envconfig = config[env];
  Object.keys(envconfig).forEach((key)=>{
    process.env[key]= envconfig[key];
  });
}
// if( env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
// } else if( env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/testTest';
// }
