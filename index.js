const app = require("express")();
const functions = require("firebase-functions");

const {
  editTodo,
  deleteTodo,
  getAllTodos,
  postOneTodo,
} = require("./APIs/todos");

const { loginUser, signUpUser } = require("./APIs/users");

// Todo routes
app.get("/todos", getAllTodos);
app.put("/todos/:todoId", editTodo);
app.post("/todos/new", postOneTodo);
app.delete("/todos/:todoId", deleteTodo);

// User routes
app.post("/login", loginUser);
app.post("/signup", signUpUser);

module.exports.api = functions.https.onRequest(app);
