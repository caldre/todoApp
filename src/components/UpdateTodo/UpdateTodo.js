import React, { useState } from "react";
import "./UpdateTodo.css";

const UpdateTodo = (props) => {
  const [title, setTitle] = useState(props.todo.title);
  const [userId, setUserId] = useState(props.todo.userId);
  const [copy, setCopy] = useState("");

  const { updateTodo, setEditing, todos, selectedUser, setTodos } = props;

  return (
    <form
      className="update-wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        updateTodo(
          {
            userId,
            id: props.todo.id,
            title,
            completed: props.todo.completed,
          },
          todos,
          selectedUser,
          setTodos,
          copy
        );
        setEditing(false);
        setCopy("");
      }}
    >
      <div className="buttons-wrapper">
        <button
          className="btn edit-btn"
          type="submit"
          aria-label="Add a new task"
        >
          <i className="edit-icon fa fa-sync fa-2x" />
        </button>
        <button
          onClick={() => setEditing(false)}
          className="btn edit-btn"
          type="submit"
          aria-label="Add a new task"
        >
          <i className="edit-icon fa fa-times fa-2x" />
        </button>
      </div>
      <div className="field-wrapper">
        <label>Modify title</label>
        <input
          name="todo"
          placeholder="Modify todo"
          className="update-field title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>
      </div>
      <div className="field-wrapper">
        <label>Modify userId</label>
        <input
          type="number"
          placeholder="Modify userId"
          className="update-field"
          value={Number(userId)}
          onChange={(e) => setUserId(parseInt(e.target.value, 10))}
          required
          min={1}
          max={10}
        ></input>
      </div>
      <div className="field-wrapper">
        <label>Copy Todo (optional)</label>
        <input
          type="number"
          placeholder="Choose destination"
          className="update-field"
          value={parseInt(copy, 10)}
          onChange={(e) => setCopy(parseInt(e.target.value, 10))}
        ></input>
      </div>
    </form>
  );
};

export default UpdateTodo;
