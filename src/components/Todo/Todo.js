import React, { useState } from "react";
import "./Todo.css";

const Todo = (props) => {
  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);

  const { toggleCompleteStatus, removeTodo } = props;
  const { userId, id, title, completed } = props.todoDetails;

  const handleTogglingClick = () => {
    toggleCompleteStatus(id);
  };

  const handleRemoveClick = () => {
    removeTodo(id);
  };

  return (
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
      <button>Ylös</button>
      <button>Alas</button>
      <button onClick={() => setEditing(!editing)}>Muokkaa</button>

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
  );
};

export default Todo;
