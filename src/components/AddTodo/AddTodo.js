import React, { useState, useEffect } from "react";
import "./AddTodo.css";

const AddTodo = (props) => {
  const [newTodoItem, setNewTodoItem] = useState("");
  const [user, setUser] = useState("");

  const { onSubmit, todoDetails } = props;

  useEffect(() => {
    if (todoDetails) {
      setNewTodoItem(todoDetails.title);
      setUser(todoDetails.userId);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newTodoItem, user);
    setNewTodoItem("");
    setUser("");
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
      <input
        placeholder="Add to user"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      ></input>
      <button className="btn add-btn" type="submit" aria-label="Add a new task">
        <i className="add-icon fas fa-plus-circle fa-3x" />
      </button>
    </form>
  );
};

export default AddTodo;
