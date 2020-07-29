import React, { useState } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import Todo from "./components/Todo/Todo";
import { v4 as uuid } from "uuid";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([
    { id: uuid(), name: "Go to the supermarket", complete: false },
    { id: uuid(), name: "Call Alice", complete: false },
    { id: uuid(), name: "Ask Alice to call Bob", complete: false },
    { id: uuid(), name: "Do the dishes", complete: false },
    { id: uuid(), name: "Change car tyres", complete: false },
  ]);
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeClick = () => {
    setDarkMode(!darkMode);
  };

  const setTheme = () => {
    return darkMode ? "dark-mode" : "light-mode";
  };

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
        return todo.id === id ? { ...todo, complete: !todo.complete } : todo;
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
      />
    );
  });

  return (
    <div className={`container ${setTheme()}`}>
      <div className="app-container">
        <button
          className={`btn theme-btn ${setTheme()} fas fa-lightbulb fa-2x`}
          onClick={handleDarkModeClick}
          aria-label="Toggle dark theme"
        ></button>
        <AddTodo onSubmit={addTodo} />
        {renderedTodos}
      </div>
    </div>
  );
};

export default App;
