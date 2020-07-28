import React, { useState } from "react";
import "./AddTodo.css";

const AddTodo = (props) => {
  const [newTodoItem, setNewTodoItem] = useState("");

  const { onSubmit } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodoItem) {
      return;
    }
    onSubmit(newTodoItem);
    setNewTodoItem("");
  };

  return (
    <form className="input-wrapper" onSubmit={(e) => handleSubmit(e)}>
      <input
        placeholder="Add new todo"
        className="input-field"
        value={newTodoItem}
        onChange={(e) => setNewTodoItem(e.target.value)}
        autoFocus
      />
      <button className="btn add-btn" type="submit" value="Submit">
        <i className="add-icon fas fa-plus-circle fa-3x" />
      </button>
    </form>
  );
};

export default AddTodo;
