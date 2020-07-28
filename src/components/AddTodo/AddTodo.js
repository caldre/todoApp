import React, { useState } from "react";
import "./AddTodo.css";

const AddTodo = (props) => {
  const [newTodoItem, setNewTodoItem] = useState("");

  const { onSubmit } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
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
        required
      />
      <button className="btn add-btn" type="submit" aria-label="Add a new task">
        <i className="add-icon fas fa-plus-circle fa-3x" />
      </button>
    </form>
  );
};

export default AddTodo;
