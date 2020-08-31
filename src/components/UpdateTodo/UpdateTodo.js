import React, { useState } from "react";

const UpdateTodo = (props) => {
  const [title, setTitle] = useState(props.todo.title);
  const [userId, setUserId] = useState(props.todo.userId);

  const { updateTodo, setEditing } = props;

  console.log(props);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateTodo({
          userId,
          id: props.todo.id,
          title,
          completed: props.todo.completed,
        });
        setEditing(false);
      }}
    >
      <input
        placeholder="Modify todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        type="number"
        placeholder="Modify userId"
        value={Number(userId)}
        onChange={(e) => setUserId(Number(e.target.value))}
      ></input>
      <button className="btn add-btn" type="submit" aria-label="Add a new task">
        <i className="add-icon fas fa-plus-circle fa-3x" />
      </button>
    </form>
  );
};

export default UpdateTodo;
