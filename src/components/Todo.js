import React, {useState} from "react";

const Todo = (props) => {
  const [hovered, setHovered] = useState(false);

  const { todoDetails, toggleCompleteStatus, removeTodo, darkMode } = props;

const renderCompleteIcon = () => {
  if (todoDetails.complete){
  return  <i id="check" className={`fas fa-check-circle fa-2x`}/>
}
  else return <i id="check"/>
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
              {renderCompleteIcon()}
      <div  className={`todo-text ${setComplete()}`}
            onClick={handleTogglingClick}  >{todoDetails.name}</div>
      
      {hovered ? <i id="delete-btn" className={`fas fa-window-close fa-2x`} onClick={handleRemoveClick}></i> : <i id="delete-btn"/>}
      
    </div>
  );
};

export default Todo;
