/* eslint-disable promise/always-return */
const { db } = require("../util/admin");
const express = require("express");
const routeGuard = require("../util/routeGuard");

const router = express.Router();

//GET All todos
router.get("/todos", routeGuard, (req, res) => {
  db.collection("todos")
    .where("username", "==", req.user.username)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let todos = [];
      data.forEach((doc) => {
        todos.push({
          todoId: doc.id,
          title: doc.data().title,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
        });
      });
      return res.status(200).json(todos);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});

//POST Create new todo
router.post("/todos/new", routeGuard, (req, res) => {
  if (req.body.body.trim() === "" || req.body.title.trim() === "") {
    return res.status(400).json({
      body: "All fields are mandatory. Please make sure to fill them all.",
    });
  }

  const newTodoItem = {
    title: req.body.title,
    username: req.user.username,
    body: req.body.body,
    createdAt: new Date().toISOString(),
  };
  db.collection("todos")
    .add(newTodoItem)
    .then((doc) => {
      const resTodoItem = newTodoItem;
      resTodoItem.id = doc.id;
      return res.status(200).json(resTodoItem);
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
});

//DELETE Deleting a specific todo
router.delete("/todos/delete/:todoId", routeGuard, (req, res) => {
  const document = db.doc(`/todos/${req.params.todoId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Todo not found." });
      } else if (doc.data().username !== req.user.username) {
        return response.status(403).json({ error: "UnAuthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.status(200).json({ message: "Delete successfull" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

//POST Updating a specific todo
router.post("/todos/update/:todoId", (req, res) => {
  if (req.body.todoId || req.body.createdAt) {
    res.status(403).json({ message: "Operation not authorized" });
  }
  let document = db.collection("todos").doc(`${req.params.todoId}`);
  document
    .update(req.body)
    .then(() => {
      res.json({ message: "Updated successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        error: err.code,
      });
    });
});

module.exports = router;
