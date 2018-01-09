var mongoose =  require("mongoose");

mongoose.Promise = global.Promise;


mongoose.connect("mongodb://<dbuser>:<dbpassword>@ds129144.mlab.com:29144/apidatabase" || "mongodb://localhost:27017/test");
module.exports = {mongoose};
