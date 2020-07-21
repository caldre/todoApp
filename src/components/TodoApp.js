import React, { useState } from "react";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
import { v4 as uuid } from "uuid";

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: uuid(), name: "Go to the supermarket", complete: false },
    { id: uuid(), name: "Call Alice", complete: false },
    { id: uuid(), name: "Ask Alice to call Bob", complete: false },
    { id: uuid(), name: "Do the dishes", complete: false },
    { id: uuid(), name: "Change car tyres", complete: false },
  ]);
  const [darkMode, setDarkMode] = useState(false)

  const handleDarkModeClick = () => {
    setDarkMode(!darkMode)
  }

  const setTheme = () => {
    if (darkMode) {
      return "dark-mode"
    } else return "light-mode"
  }

  const addTodo = (todo) => {
    setTodos([...todos, { id: uuid(), name: todo, complete: false }]);
  };

  const removeTodo = (id) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const toggleCompleteStatus = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      })
    );
  };

  const renderedTodos = todos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todoDetails={todo}
        toggleCompleteStatus={toggleCompleteStatus}
        removeTodo={removeTodo}
        darkMode={darkMode}
      />
    );
  });

  return (
    <div className={`container ${setTheme()}`}>
        <div className="app-container">
      <button className="theme-btn" onClick={handleDarkModeClick} >Dark Mode </button>
      <AddTodo onSubmit={addTodo}/>
      {renderedTodos}
      </div>
    </div>
  );
};

export default TodoApp;
