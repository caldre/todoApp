import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./AddTodo.css";

const AddTodo = (props) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState();

  const { onSubmit } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ userId, id: uuid(), title, completed: false });
    setTitle("");
    setUserId("");
  };

  return (
    <form className="input-wrapper" onSubmit={(e) => handleSubmit(e)}>
      <input
        placeholder="Add new todo"
        className="input-field"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        required
      />
      <input
        placeholder="Add to user ID"
        type="number"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
        required
        min={1}
        max={10}
      ></input>
      <button className="btn add-btn" type="submit" aria-label="Add a new task">
        <i className="add-icon fas fa-plus-circle fa-3x" />
      </button>
    </form>
  );
};

export default AddTodo;
