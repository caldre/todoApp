import React, { useState, useEffect } from "react";

const Todo = (props) => {
  const [color, setColor] = useState("");
  const [text, setText] = useState("");

  const { todoDetails, toggleCompleteStatus, removeTodo } = props;

  useEffect(() => {
    if (todoDetails.complete === true) {
      setColor("lightgreen");
      setText("Complete");
    } else {
      setColor("pink");
      setText("Incomplete");
    }
  }, [todoDetails.complete]);

  const handleTogglingClick = () => {
    toggleCompleteStatus(todoDetails.id);
  };

  const handleRemoveClick = () => {
    removeTodo(todoDetails.id);
  };

  return (
    <div className="wrapper" style={{ backgroundColor: color }}>
      <h3>{todoDetails.name}</h3>
      <button className="btn" onClick={handleTogglingClick}>
        {text}
      </button>
      <button className="btn" onClick={handleRemoveClick}>
        Remove from list
      </button>
    </div>
  );
};

export default Todo;
