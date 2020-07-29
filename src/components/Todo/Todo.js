import React, { useState } from "react";
import "./Todo.css";

const Todo = (props) => {
  const [hovered, setHovered] = useState(false);

  const { todoDetails, toggleCompleteStatus, removeTodo } = props;

  const handleTogglingClick = () => {
    toggleCompleteStatus(todoDetails.id);
  };

  const handleRemoveClick = () => {
    removeTodo(todoDetails.id);
  };

  return (
    <div
      className={`todo-wrapper`}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        className="btn complete-btn"
        onClick={handleTogglingClick}
        aria-label="Toggle tasks complete status"
      >
        <div className="todo-text-wrapper">
          <i
            className={`check-icon ${
              todoDetails.complete ? "fas fa-check-circle fa-2x" : ""
            }`}
          />

          <p className={`todo-text ${todoDetails.complete ? "completed" : ""}`}>
            {todoDetails.name}
          </p>
        </div>
      </button>

      <button
        className="btn delete-btn"
        onClick={handleRemoveClick}
        aria-label="Delete task"
      >
        <i
          className={`delete-icon ${
            hovered ? "fas fa-window-close fa-2x" : ""
          }`}
        ></i>
      </button>
    </div>
  );
};

export default Todo;
