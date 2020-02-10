import React, { Component } from "react";
import "./App.css";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import Header from "./components/layout/Header";
import uuid from "uuid";

class App extends Component {
  state = {
    todos: [
      {
        id: uuid.v4(),
        title: "Go out.",
        completed: false
      },
      {
        id: uuid.v4(),
        title: "Go home.",
        completed: false
      },
      {
        id: uuid.v4(),
        title: "Sleep.",
        completed: false
      }
    ]
  };
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(item => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      })
    });
  };
  deleteTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(item => item.id !== id)]
    });
  };
  addTodo = title => {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };
  render() {
    return (
      <div className="App">
        <div style={containerStyle}>
          <Header />
          <AddTodo addTodo={this.addTodo} />
          <Todos
            todos={this.state.todos}
            markComplete={this.markComplete}
            deleteTodo={this.deleteTodo}
          />
        </div>
      </div>
    );
  }
}


//App.js Styles
const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto"
};

export default App;
