import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import Todo from "./components/Todo/Todo";
import DropDown from "./components/DropDown/DropDown";
import { v4 as uuid } from "uuid";
import TodoService from "./utils/TodoService";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [selectedUser, setSelectedUser] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((response) => response.json())
      .then((response) => {
        setTodos(response);
      });
  }, []);

  // console.log(todos);

  const allUserIds = todos.map((item) => item.userId);
  const uniqueIds = [...new Set(allUserIds)];

  const handleDarkModeClick = () => {
    setDarkMode(!darkMode);
  };

  const setTheme = () => {
    return darkMode ? "dark-mode" : "light-mode";
  };

  const addTodo = (todo) => {
    setTodos([...todos, { id: uuid(), title: todo, completed: false }]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleteStatus = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      })
    );
  };

  const filteredTodos = todos.filter((todo) => {
    return todo.userId === selectedUser;
  });

  const renderedTodos = filteredTodos.map((todo) => {
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
          className={`btn theme-btn fas fa-lightbulb fa-2x ${setTheme()}`}
          onClick={handleDarkModeClick}
          aria-label="Toggle dark theme"
        ></button>
        <AddTodo onSubmit={addTodo} />
        <DropDown users={uniqueIds} setSelectedUser={setSelectedUser} />
        {renderedTodos}
      </div>
    </div>
  );
};

export default App;
