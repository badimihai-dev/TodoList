const { db } = require("../utils/admin");

exports.getTodos = (req, res) => {
  db.collection("/Todos/") //.where("userHandle", "==", "user")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let todos = [];
      data.forEach(doc => {
        console.log(doc);
        todos.push({
          id: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
          completed: doc.data().completed,
          userHandle: doc.data().userHandle
        });
      });
      return res.json(todos);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err.code);
    });
};

exports.addTodo = (req, res) => {
  let newTodo = {
    title: req.body.title,
    userHandle: req.body.userHandle,
    completed: false,
    createdAt: new Date().toISOString()
  };
  db.collection("/Todos/")
    .add(newTodo)
    .then(doc => {
      const response = newTodo;
      response.id = doc.id;
      return res.status(200).json(response);
    });
};

exports.deleteTodo = (req, res) => {
  db.doc(`/Todos/${req.params.todoId}`)
    .delete()
    .then(() => {
      return res.status(200).json(({message: "Todo deleted."}));
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};
