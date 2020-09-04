import React, { useState } from "react";
import UpdateTodo from "../UpdateTodo/UpdateTodo";
import "./Todo.css";

const Todo = (props) => {
  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);

  const {
    toggleCompleteStatus,
    updateTodo,
    removeTodo,
    moveItem,
    selectedUser,
    setSelectedUser,
    todos,
    setTodos,
    users,
    setUsers,
  } = props;
  const { id, title, completed } = props.todoDetails;

  const handleTogglingClick = () => {
    toggleCompleteStatus(id, completed, setTodos);
  };

  const handleRemoveClick = () => {
    removeTodo(
      id,
      selectedUser,
      setSelectedUser,
      todos,
      setTodos,
      users,
      setUsers
    );
  };

  return editing ? (
    <UpdateTodo
      todo={props.todoDetails}
      updateTodo={updateTodo}
      setEditing={setEditing}
      todos={props.todos}
      selectedUser={props.selectedUser}
      setTodos={props.setTodos}
    />
  ) : (
    <div
      className={`todo-wrapper `}
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
          <button
            className="btn btn-up"
            onClick={() => moveItem(id, -1, selectedUser, todos, setTodos)}
          >
            <i
              className={`down-icon ${hovered ? "fas fa-caret-up fa-2x" : ""}`}
            ></i>
          </button>
          <button
            className="btn btn-down"
            onClick={() => moveItem(id, +1, selectedUser, todos, setTodos)}
          >
            <i
              className={`down-icon ${
                hovered ? "fas fa-caret-down fa-2x" : ""
              }`}
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
