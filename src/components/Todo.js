import React, {useState} from "react";

const Todo = (props) => {
  const [hovered, setHovered] = useState(false);

  const { todoDetails, toggleCompleteStatus, removeTodo, darkMode } = props;

const renderCompleteIcon = () => {
  if (todoDetails.complete){
  return "fas fa-check-circle fa-2x"
}
  else return null
}

const setComplete = () => {
  if(todoDetails.complete) {
    return "completed"
  } else return "incomplete"
}

  const handleTogglingClick = () => {
    toggleCompleteStatus(todoDetails.id);
  };

  const handleRemoveClick = () => {
    removeTodo(todoDetails.id);
  };

  const setTheme = () => {
    if (darkMode) {
      return "dark-mode"
    } else return "light-mode"
  }

  return (
    <div    className={`todos-wrapper ${setTheme()}`}
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
      <i id="check" className={renderCompleteIcon()} />
      <p  className={`todo-text ${setComplete()}`}
            onClick={handleTogglingClick}  >{todoDetails.name}</p>
      <button className="btn" onClick={handleRemoveClick}>
          {hovered ? <i id="delete-btn" className={`fas fa-window-close fa-2x`} ></i> : <i id="delete-btn"/>}
      </button>
    </div>
  );
};

export default Todo;
