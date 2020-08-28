import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import Todo from "./components/Todo/Todo";
import DropDown from "./components/DropDown/DropDown";
import { v4 as uuid } from "uuid";
import TodoService from "./utils/TodoService";
import { saveState, loadState, clearState } from "./utils/localStorage";
import "./App.css";

const App = () => {
  const [selectedUser, setSelectedUser] = useState(
    Object.keys(localStorage)[0]
  );
  const [todos, setTodos] = useState([loadState(1)]);
  const [users, setUsers] = useState(
    Object.keys(localStorage).sort((a, b) => a - b)
  );
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (Object.keys(localStorage).length === 0) {
      fetch("http://localhost:3001/todos")
        .then((response) => response.json())
        .then((response) => {
          const usersIDs = response.map((todo) => todo.userId);
          const uniqueIDs = [...new Set(usersIDs)];

          uniqueIDs.forEach((id) => {
            const filteredTodos = response.filter((todo) => todo.userId === id);
            saveState(id, filteredTodos);
          });
          setUsers(uniqueIDs.sort((a, b) => a - b));
          setTodos(loadState(selectedUser));
        });
    }
    const users = Object.keys(localStorage);
    console.log(users);
    setTodos(loadState(selectedUser));
  }, [selectedUser]);

  const handleDarkModeClick = () => {
    setDarkMode(!darkMode);
  };

  const setTheme = () => {
    return darkMode ? "dark-mode" : "light-mode";
  };

  const addTodo = (title, userId) => {
    let newTodoList = [
      ...todos,
      { userId, id: uuid(), title, completed: false },
    ];
    setTodos(newTodoList);
    saveState(selectedUser, newTodoList);
  };

  const removeTodo = (id) => {
    let newTodoList = todos.filter((todo) => todo.id !== id);
    setTodos(newTodoList);
    saveState(selectedUser, newTodoList);
    console.log(todos.length);
    if (todos.length === 1) {
      localStorage.removeItem(selectedUser);
      setUsers(Object.keys(localStorage).sort((a, b) => a - b));
    }
  };

  const handleClearButton = () => {
    setTodos([]);
    clearState();
  };

  const toggleCompleteStatus = (id) => {
    let newTodoList = todos.map((todo) => {
      return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
    });
    setTodos(newTodoList);
    saveState(selectedUser, newTodoList);
  };

  const moveItem = (id, toPosition) => {
    const indexOf = todos.map((todo) => todo.id).indexOf(id);
    const newTodos = [...todos];
    if (toPosition > 0 && indexOf + 1 !== newTodos.length) {
      newTodos.splice(indexOf + 2, 0, todos[indexOf]);
      newTodos.splice(indexOf, 1);
      setTodos([...newTodos]);
      saveState(selectedUser, [...newTodos]);
    } else if (toPosition < 0 && indexOf !== 0) {
      newTodos.splice(indexOf - 1, 0, todos[indexOf]);
      newTodos.splice(indexOf + 1, 1);
      setTodos([...newTodos]);
      saveState(selectedUser, [...newTodos]);
    }
    return;
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
        moveItem={moveItem}
        onSubmit={addTodo}
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
          onClick={() => handleClearButton()}
          aria-label="Clear todos from memory"
        >
          Clear memory
        </button>
        <AddTodo onSubmit={addTodo} selectedUser={selectedUser} />
        <DropDown users={users} setSelectedUser={setSelectedUser} />
        {renderedTodos}
      </div>
    </div>
  );
};

export default App;
