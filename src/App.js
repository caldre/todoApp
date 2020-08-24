import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import Todo from "./components/Todo/Todo";
import DropDown from "./components/DropDown/DropDown";
import { v4 as uuid } from "uuid";
import TodoService from "./utils/TodoService";
import { saveState, loadState, clearState } from "./utils/localStorage";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [selectedUser, setSelectedUser] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("todos") === null) {
      fetch("http://localhost:3001/todos")
        .then((response) => response.json())
        .then((response) => {
          setTodos(response);
          saveState(response);
        });
    }
    setTodos(loadState());
  }, []);

  const allUserIds = todos.map((item) => item.userId);
  const uniqueIds = [...new Set(allUserIds)];

  const handleDarkModeClick = () => {
    setDarkMode(!darkMode);
  };

  const setTheme = () => {
    return darkMode ? "dark-mode" : "light-mode";
  };

  const addTodo = (todo) => {
    let newTodoList = [
      ...todos,
      { userId: selectedUser, id: uuid(), title: todo, completed: false },
    ];
    setTodos(newTodoList);
    saveState(newTodoList);
  };

  const removeTodo = (id) => {
    let newTodoList = todos.filter((todo) => todo.id !== id);
    setTodos(newTodoList);
    saveState(newTodoList);
  };

  const toggleCompleteStatus = (id) => {
    let newTodoList = todos.map((todo) => {
      return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
    });
    setTodos(newTodoList);
    saveState(newTodoList);
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
        <button
          className="btn clear-btn"
          onClick={() => clearState()}
          aria-label="Clear todos from memory"
        >
          Clear memory
        </button>
        <AddTodo onSubmit={addTodo} />
        <DropDown users={uniqueIds} setSelectedUser={setSelectedUser} />
        {renderedTodos}
      </div>
    </div>
  );
};

export default App;
