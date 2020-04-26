var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var todoList = [
    {
        id: 1,
        todo: "Implement a REST API"
    },
    {
        id: 2,
        todo: "Implement a Henry API"
    }
];

// GET /api/todos
app.get('/api/todos', function (req, res) {
    console.log("Here is the to do list!")
    res.send(todoList)
})

// GET /api/todos/:id
// app.get('/api/todos/:id', function (req, res) {
//     console.log("id id id")
//     const myTodo = todoList.filter(function(todoObject) {
//         return  req.params.id == todoObject.id
//     })
//     res.send(myTodo)
// })
    app.get('/api/todos/:id', function (req, res) {
        console.log("It is getting")
        // res.send(req.params.id)
        // console.log(todoList[param])
        // var todoItem = todoList.filter(function (item) {
        //     var param = parseInt(req.params.id, 10)
        //     if (item === param) {
        //         return item
        //     }
        // })
        var todoItem = todoListFind(todoList, req.params.id)
            res.send(todoItem)
        
    })

    function todoListFind(list, param) {
        return list.filter((item) => {
          if (item.id == param) {
            return item;
          }
        });
      }
    
    

// POST /api/todos
app.post('/api/todos', function (req, res) {
    console.log('Posting todos')
    // console.log(req.params.todos)
    console.log(req.body)

    const newTodo = {
        id: todoList.length + 1,
        todo: req.body.todo
    }

    todoList.push(newTodo)

    // res.send({
    //     type: 'POST',
    //     id:req.body.id,
    //     todo: req.body.todo
    // })
    res.send(todoList)
})
// PUT /api/todos/:id
app.put('/api/todos/:id', function (req, res) {
    console.log(req.params.id)

    // for (var i = 0; i < todoList.length; i++) {
    //     console.log(todoList[i].id);
    //     if (todoList[i].id == req.params.id) {
    //         console.log(todoList[i])
    //         todoList[i].todo = req.body.todo
    //         res.send(todoList)
    //     }
    // }
    todoList.map((todo) => (todo.id == req.params.id) ? todo.todo = req.body.todo : null)
    todoList.map(function (todo) {
    return ((todo.id == req.params.id) ? todo.todo = req.body.todo : null)
   }) 
    res.send(todoList)
})

// DELETE /api/todos/:id
app.delete('/api/todos/:id', function (req, res) {
    
    const requestId = req.params.id

    let todos = todoList.filter(todos => {
        return todos.id == requestId
    })[0]

    const index = todoList.indexOf(todos)

    todoList.splice(index, 1)

    res.send("It is deleted")

})


app.listen(5000, function(){
    console.log('Todo List API is now listening on port 5000...');
})