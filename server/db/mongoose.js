var mongoose =  require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://root:root@ds129144.mlab.com:29144/apidatabase"  );
module.exports = {mongoose};
