import React, { useState } from "react";

const AddTodo = (props) => {
  const [newTodoItem, setNewTodoItem] = useState("");

  const { onSubmit } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodoItem) {
      return;
    }
    onSubmit(newTodoItem);
    setNewTodoItem("");
  };

  return (
    <form
      className="input-wrapper"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        placeholder="Add new todo"
        id="input"
        value={newTodoItem}
        onChange={(e) => setNewTodoItem(e.target.value)}
        autoFocus
      />
      <button className="btn" type="submit" value="Submit">
      <i id="add-btn" className="fa fa-plus-circle fa-3x" />
        
      </button>
    </form>
  );
};

export default AddTodo;
