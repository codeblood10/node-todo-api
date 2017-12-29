const expect = require('expect');
const request = require('supertest'); // supertest convert request string to json automatically

const{app} = require('./../server');
const{Todo} = require('./../model/todo.js');

//before each run before every test
const todos = [{
  text : "first"
},{
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
