//const{SHA256}  = require('crypto-js');
const jwt = require('jsonwebtoken');
var data  = {
 id :10
};
var token = jwt.sign(data,'1234');
console.log(token);
var decoded = jwt.verify(token,'1234');
console.log('decoded',decoded);
// var message = "i am user 2";
// var hash = SHA256(message).toString();
// console.log(`Hash:${hash}`);
//
// // var data  = {
//  id : 4
// };
// var token =  {
//   data,
//   hash :SHA256(JSON.stringify(data)+'somesecret').toString()
// }
// var resulthash = SHA256(JSON.stringify(token.data)+"somesecret").toString(); // this technique is called salting
// if(resulthash === token.hash)
//  {
//     console.log("data was not changed");
// }
// else
// {
//   console.log("data was manipulated do not trust");
// }
