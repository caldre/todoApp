import React, { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import "./Todo.css";

const Todo = (props) => {
  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);

  const { toggleCompleteStatus, removeTodo, moveItem } = props;
  const { userId, id, title, completed } = props.todoDetails;

  const handleTogglingClick = () => {
    toggleCompleteStatus(id);
  };

  const handleRemoveClick = () => {
    removeTodo(id);
  };

  return editing ? (
    <AddTodo todoDetails={props.todoDetails} onSubmit={props.onSubmit} />
  ) : (
    <div
      className={`todo-wrapper`}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid="todo-wrapper"
    >
      <button
        className="btn complete-btn"
        onClick={handleTogglingClick}
        aria-label="Toggle tasks complete status"
        data-testid="toggle"
      >
        <div className="todo-text-wrapper">
          <i
            data-testid="check-icon"
            className={`check-icon ${
              completed ? "fas fa-check-circle fa-2x" : ""
            }`}
          />

          <p className={`todo-text ${completed ? "completed" : ""}`}>{title}</p>
        </div>
      </button>
      <div className="todo-tools-wrapper">
        <div className="arrow-wrapper">
          <button className="btn btn-up" onClick={() => moveItem(id, -1)}>
            <i className={`down-icon ${hovered ? "fas fa-caret-up" : ""}`}></i>
          </button>
          <button className="btn btn-down" onClick={() => moveItem(id, +1)}>
            <i
              className={`down-icon ${hovered ? "fas fa-caret-down" : ""}`}
            ></i>
          </button>
        </div>
        <button className="btn btn-edit" onClick={() => setEditing(true)}>
          <i className={`edit-icon ${hovered ? "fas fa-edit fa-2x" : ""}`}></i>
        </button>

        <button
          className="btn delete-btn"
          onClick={handleRemoveClick}
          aria-label="Delete task"
          data-testid="delete"
        >
          <i
            data-testid="delete-icon"
            className={`delete-icon ${
              hovered ? "fas fa-window-close fa-2x" : ""
            }`}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default Todo;
