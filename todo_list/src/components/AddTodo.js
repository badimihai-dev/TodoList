import React, { Component } from "react";

export class AddTodo extends Component {
  state = {
    title: ""
  };

  submitTodo = e => {
    e.preventDefault();
    if (this.state.title.trim() !== "") {
      this.props.addTodo(this.state.title);
    }
    this.setState({ title: "" });
  };
  setTitle = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.submitTodo} style={{ display: "flex" }}>
          <input
            type="text"
            name="title"
            onChange={this.setTitle}
            style={inputStyle}
            placeholder="Add Todo..."
            value={this.state.title}
          />
          <input type="submit" style={buttonStyle} value="ADD" />
        </form>
      </div>
    );
  }
}

//AddTodo.js styles
const inputStyle = {
  flex: "12",
  padding: "10px"
};
const buttonStyle = {
  flex: "3",
  backgroundColor: "#222",
  color: '#fff',
  fontWeight: '700'
};

export default AddTodo;
