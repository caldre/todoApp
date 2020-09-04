import React, { useState } from "react";
import "./AddTodo.css";

const AddTodo = (props) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState();

  const { addTodo, selectedUser, setUsers, setTodos } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId, title }, selectedUser, setUsers, setTodos);
    setTitle("");
    setUserId("");
  };

  return (
    <form className="input-wrapper" onSubmit={(e) => handleSubmit(e)}>
      <div className="field">
        <label>Add Title</label>
        <input
          placeholder="Add new todo"
          className="input-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          required
        />
      </div>
      <div className="field">
        <label>Add user ID</label>
        <input
          placeholder="Add to user ID"
          type="number"
          className="input-field"
          value={userId}
          onChange={(e) => setUserId(parseInt(e.target.value, 10))}
          required
          min={1}
          max={10}
        ></input>
        <button
          className="btn add-btn"
          type="submit"
          aria-label="Add a new task"
        >
          <i className="add-icon fas fa-plus-circle fa-3x" />
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
