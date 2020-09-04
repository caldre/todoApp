import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTodo from "./components/AddTodo/AddTodo";
import Todo from "./components/Todo/Todo";
import DropDown from "./components/DropDown/DropDown";
import {
  addTodo,
  updateTodo,
  toggleCompleteStatus,
  removeTodo,
  moveItem,
} from "./utils/todo-util";
import { saveState, loadState, clearState } from "./utils/localStorage";
import "./App.css";

const App = () => {
  const [selectedUser, setSelectedUser] = useState(
    parseInt(Object.keys(localStorage).sort((a, b) => a - b)[0], 10) || 1
  );
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState(
    Object.keys(localStorage).sort((a, b) => a - b)
  );
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let uniqueIDs = [];
    if (Object.keys(localStorage).length === 0) {
      axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
        const usersIDs = res.data.map((todo) => todo.userId);
        uniqueIDs = [...new Set(usersIDs)].sort((a, b) => a - b);
        setUsers(uniqueIDs);
        uniqueIDs.forEach((id) => {
          const filteredTodos = res.data.filter((todo) => todo.userId === id);
          saveState(id, filteredTodos);
        });
        setTodos(loadState(uniqueIDs[0]));
      });
    }
    uniqueIDs = Object.keys(localStorage).sort((a, b) => a - b);
    setUsers(uniqueIDs);
    setTodos(loadState(selectedUser));
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      const filteredTodos = todos.filter(
        (todo) => todo.userId === selectedUser.id
      );
      saveState(selectedUser.id, filteredTodos);
    }
  }, [selectedUser, todos]);

  const handleDarkModeClick = () => {
    setDarkMode(!darkMode);
  };

  const setTheme = () => {
    return darkMode ? "dark-mode" : "light-mode";
  };

  const handleClearButton = () => {
    setTodos([]);
    clearState();
  };

  const renderedTodos = todos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todoDetails={todo}
        toggleCompleteStatus={toggleCompleteStatus}
        updateTodo={updateTodo}
        removeTodo={removeTodo}
        moveItem={moveItem}
        todos={todos}
        setTodos={setTodos}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        users={users}
        setUsers={setUsers}
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
        <AddTodo
          addTodo={addTodo}
          selectedUser={selectedUser}
          setUsers={setUsers}
          setTodos={setTodos}
        />
        <DropDown options={users} setSelectedUser={setSelectedUser} />
        {renderedTodos}
      </div>
    </div>
  );
};

export default App;
