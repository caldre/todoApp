import React, { useState } from "react";
import "./Todo.css";

const Todo = (props) => {
  const [hovered, setHovered] = useState(false);

  const { todoDetails, toggleCompleteStatus, removeTodo, setTheme } = props;

  const setComplete = () => {
    if (todoDetails.complete) {
      return "completed";
    } else return "incomplete";
  };

  const handleTogglingClick = () => {
    toggleCompleteStatus(todoDetails.id);
  };

  const handleRemoveClick = () => {
    removeTodo(todoDetails.id);
  };

  return (
    <div
      className={`todos-wrapper ${setTheme()}`}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button className="btn complete-btn" onClick={handleTogglingClick}>
        <div className="todo-text-wrapper">
          {todoDetails.complete ? (
            <i className="check-icon fas fa-check-circle fa-2x" />
          ) : (
            <i className="check-icon" />
          )}
          <p className={`todo-text ${setComplete()}`}>{todoDetails.name}</p>
        </div>
      </button>

      <button className="btn delete-btn" onClick={handleRemoveClick}>
        {hovered ? (
          <i className="delete-icon fas fa-window-close fa-2x"></i>
        ) : (
          <i className="delete-icon" />
        )}
      </button>
    </div>
  );
};

export default Todo;