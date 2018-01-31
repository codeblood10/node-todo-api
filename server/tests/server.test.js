const expect = require('expect');
const request = require('supertest'); // supertest convert request string to json automatically
var {ObjectID} = require('mongodb');

const{app} = require('./../server');
const{Todo} = require('./../model/todo.js');
const{User} = require('./../model/user.js');
const{todos,populateTodos,users,populateUsers} = require('./seed/seed.js');

//before each run before every test
// const todos = [{
//   _id : new ObjectID(),
//   text : "first"
// },{
//   _id : new ObjectID(),
//   text :"second",
//   completed : true ,
//   completedAt : 2314
// }];
 // beforeEach((done)=>{
 //  // for testing post request
 //  // Todo.remove({}).then(()=>done()); // we have to remove all the todo from the database to run the test to check whether request id fufilled or not
 // // for testing get request
 //  Todo.remove({}).then(()=>{
 //     return Todo.insertMany(todos);
 //   }).then(()=>{
 //     done();
 //    });
 // });

 beforeEach(populateTodos);
 beforeEach(populateUsers);
describe('POST /todos',() =>{
   it('should create  new todo',(done)=>{
       var text = "test todo text";
       request(app)
         .post('/todos')
         .send({text})
         .expect(200)
         .expect((res)=>{
           expect(res.body.text).toBe(text)
         })
         .end((err,res)=>{
             if(err)
             {
               console.log("should be defined");
               return  done(err);
            }
        Todo.find({text}).then((todos)=> {
        expect(todos.length).toBe(1);
         expect(todos[0].text).toBe(text);
            done();
          }).catch((e)=> done(e));
                 });
   });
   it('should not create create todo with incorrect data',(done)=>{
       request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err)
            {
              console.log('should be defined as error');
              return done(err);
            }
      Todo.find().then((todos)=>{
            expect(todos.length).toBe(2);
            // expect(todos[0]).toBe("");
           done();
          }).catch((e)=>done(e));
        });


   });
});

describe("GET/todos" ,()=>{
  it("should get all todos",(done)=>{

   request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      console.log(res.body);
      expect(res.body.todos.length).toBe(2);
     })
    .end(done);
   });
 });
describe("Get/todos/id",()=>{
  it("should get tod oby id",(done)=>{
     request(app)
     .get(`/todos/${todos[0]._id}`)
     .expect(200)
     .expect((res)=>{
        console.log(res.body.todos);
        expect(res.body.todos.text).toBe(todos[0].text);
     })
    .end(done);
  });

 it("should return a 404 not found",(done)=>{
    request(app)
    .get('/todos/5a46c396fa2c98331cbc8ff9')
    .expect(404)
    .end(done);

 });

it("should return a 404",(done)=>{
   request(app)
   .get(`/todos/6a46c396fa2c98331cbc8ff9`)
   .expect(404)
   .end(done);
});

});

describe("delete todo/id",()=>{
    it("should delete required todos",(done)=>{
     request(app)
     .delete(`/todos/${todos[0]._id}`)
     .expect(200)
      .expect((res)=>{
        console.log(res.body.todos);
       })
       .end((err,res)=>{
         if(err)
           return done(err);
            Todo.findById(todos[0]._id).then((todo)=>{
               expect(todo).toNotExist();
               done();
          }).catch((e)=>done(e));


       });
     });

     it("should return a 404 not found",(done)=>{
         var id = new ObjectID();
        request(app)
        .delete(`/todos/id`)
        .expect((res)=>{
          console.log(res.body.todos);
         })
        .expect(404)
        .end(done);

     });

    it("should return a 404",(done)=>{
       request(app)
       .delete(`/todos/396fa2c98331cbc8ff9`)

       .expect(404)
       .end(done);
    });
});

 describe("PAtch todos/:id",()=>{
   it("should update the todo",(done)=>{
      var body = { text:"this is an update",
                   completed:true
                  };
      request(app)
      .patch(`/todos/${todos[0]._id}`)
      .send(body)
      .expect(200)
      .end((err,res)=>{
          if(err)
          {
            return done(err);
          }
          Todo.findById(todos[0]._id).then((todo)=>{
             console.log(todo);
             expect(todo.text).toBe(body.text);
             expect(todo.completedAt).toBeA("number");
             done();
        }).catch((e)=>done(e));
      });
 });

 it("should clear the completedat",(done)=>{
    var body = { text:"this is an update",
                 completed:false
                };
    request(app)
    .patch(`/todos/${todos[1]._id}`)
    .send(body)
    .expect(200)
    .end((err,res)=>{
        if(err)
        {
          return done(err);
        }
        Todo.findById(todos[1]._id).then((todo)=>{
           console.log(todo);
           expect(todo.text).toBe(body.text);
           expect(todo.completedAt).toBe(null);
           done();
      }).catch((e)=>done(e));
    });
});

});

describe("get /user/me",()=>{
   it("should return user when authenicated",(done)=>{
      request(app)
      .get('/users/me')
      .set('x-auth',users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
         expect(res.body._id).toBe(users[0]._id.toHexString());
         expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
   });
    it("should return 401 it user not authenticated",(done)=>{
      request(app)
      .get('/users/me')
      .expect(401)
      .expect((res)=>{
         expect(res.body).toEqual({});

      })
      .end(done);
    });

});

describe('post/users',(done)=>{
  it("should create a user",(done)=>{
     var body = {email:"ankitshr2@gmail.com",password:"vuivavaav"};
     request(app)
       .post('/users')
       .send(body)
       .expect(200)
      .expect((res)=>{expect(res.headers['x-auth']).toExist();})
       .end((err,res)=>{
           if(err)
           {
             console.log("should be defined");
             return  done(err);
          }

      User.find({email:body.email}).then((userg)=> {
      expect(userg.length).toBe(1);

          done();
        }).catch((e)=> done(e));
               });

  });

  it("should return vaildation errors",(done)=>{
     var body = {email:"ankitshr2gmil.com",password:"vuivavaav"};
     request(app)
       .post('/users')
       .send(body)
       .expect(400)
       .end(done);
   });
   it("should return email in use",(done)=>{
      var body = {email:"ankitshr8@gmail.com",password:"vuivavaav"};
      request(app)
        .post('/users')
        .send(body)
        .expect(400)
        .end(done);
    });

});

describe('post/users login',(done)=>{
  it("should login user",(done)=>{

     request(app)
       .post('/users/login')
       .send({email:users[1].email,password:users[1].password})
       .expect(200)
      .expect((res)=>{expect(res.headers['x-auth']).toExist();})
       .end((err,res)=>{
           if(err)
           {
             console.log("should be defined");
             return  done(err);
          }

      User.findById(users[1]._id).then((userg)=> {
    //expect(userg.length).toBe(1); // findBYid return a token and find return an array //pitfall
    //  console.log(userg);

      expect(userg.tokens[0]).toInclude({access:"auth",token:res.headers["x-auth"]});
          done();
        }).catch((e)=> done(e));
               });

  });

  it("should return invalid login",(done)=>{
    request(app)
      .post('/users/login')
      .send({email:users[1].email,password:"addv"})
      .expect(400)

      .end(done);
   });


});

describe("should remove auth token on log out",()=>{
   it('should remove auth token',(done)=>{
     request(app)
     .delete("/users/me/token")
     .set('x-auth',users[0].tokens[0].token)
     .expect(200)
     .end((err,res)=>{
       if(err)
       {
         return done(err);
       }
       User.findById(users[0]._id).then((userg)=> {

      //  console.log(userg);
       expect(userg.tokens).toExclude({access:"auth",token:res.headers["x-auth"]});
           done();
         }).catch((e)=> done(e));
     });
   });

});
