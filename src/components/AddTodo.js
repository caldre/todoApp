import React, { useState } from "react";

const AddTodo = (props) => {
  const [newTodoItem, setNewTodoItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodoItem) {
      return;
    }
    props.onSubmit(newTodoItem);
    setNewTodoItem("");
  };

  return (
    <form
      className="wrapper"
      style={{ gridTemplateColumns: "7fr 2fr" }}
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        placeholder="Add new todo"
        value={newTodoItem}
        onChange={(e) => setNewTodoItem(e.target.value)}
        autoFocus
      />
      <button className="btn btn-success" type="submit" value="Submit">
        Submit
      </button>
    </form>
  );
};

export default AddTodo;
