import React, { Component } from "react";

export class TodoItem extends Component {
  getStyle = () => {
    return {
      backgroundColor: "#f0f0f0",
      border: "2px solid #fff",
      textDecoration: this.props.item.completed ? "line-through" : "none",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "5px",
    };
  };
  render() {
    const { title, id } = this.props.item;
    return (
      <div style={this.getStyle()}>
        <input
          type="checkbox"
          onChange={this.props.markComplete.bind(this, id)}
        />
        <span>{title}</span>
        <button
          style={buttonStyle}
          onClick={this.props.deleteTodo.bind(this, id)}
        >
          x
        </button>
      </div>
    );
  }
}

//TodoItem.js styles
const buttonStyle = {
  backgroundColor: "tomato",
  padding: "2px 7px",
  borderRadius: "50px",
  color: "#fff"
};

export default TodoItem;
