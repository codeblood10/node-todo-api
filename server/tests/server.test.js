const expect = require('expect');
const request = require('supertest'); // supertest convert request string to json automatically
var {ObjectID} = require('mongodb');

const{app} = require('./../server');
const{Todo} = require('./../model/todo.js');

//before each run before every test
const todos = [{
  _id : new ObjectID(),
  text : "first"
},{
  _id : new ObjectID(),
  text :"second"
}];
 beforeEach((done)=>{
  // for testing post request
  // Todo.remove({}).then(()=>done()); // we have to remove all the todo from the database to run the test to check whether request id fufilled or not
 // for testing get request
  Todo.remove({}).then(()=>{
     return Todo.insertMany(todos);
   }).then(()=>{
     done();
    });
 });



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
