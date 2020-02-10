const functions = require("firebase-functions");
const app = require("express")();

const { getTodos, addTodo, deleteTodo } = require("./handlers/todos");
const { getUser, login, signup } = require("./handlers/users");

app.get("/todos", getTodos);
app.post('/todos', addTodo)
app.delete('/todos/:todoId', deleteTodo)

//app.get('/user', getUser)
//app.post('/login', login)
app.post('/signup', signup)

exports.api = functions.region("europe-west2").https.onRequest(app);
