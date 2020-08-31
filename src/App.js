import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTodo from "./components/AddTodo/AddTodo";
import Todo from "./components/Todo/Todo";
import DropDown from "./components/DropDown/DropDown";
import { v4 as uuid } from "uuid";
import TodoService from "./utils/TodoService";
import { saveState, loadState, clearState } from "./utils/localStorage";
import "./App.css";

const App = () => {
  const [selectedUser, setSelectedUser] = useState(1);
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState(
    Object.keys(localStorage).sort((a, b) => a - b)
  );
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let uniqueIDs = [];
    if (Object.keys(localStorage).length === 0) {
      axios
        .get("https://jsonplaceholder.typicode.com/todos/")
        .then((response) => {
          const usersIDs = response.data.map((todo) => todo.userId);
          uniqueIDs = [...new Set(usersIDs)].sort((a, b) => a - b);

          uniqueIDs.forEach((id) => {
            const filteredTodos = response.data.filter(
              (todo) => todo.userId === id
            );
            saveState(id, filteredTodos);
            setUsers(uniqueIDs);
          });
        });
    }
    uniqueIDs = Object.keys(localStorage).sort((a, b) => a - b);
    setUsers(uniqueIDs);
    setTodos(loadState(selectedUser));
  }, [selectedUser]);

  const handleDarkModeClick = () => {
    setDarkMode(!darkMode);
  };

  const setTheme = () => {
    return darkMode ? "dark-mode" : "light-mode";
  };

  const addTodo = (userId, id, title, completed) => {
    axios
      .post(`https://jsonplaceholder.typicode.com/todos/`, {
        userId,
        id,
        title,
        completed,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data);
          saveState(res.data.userId, [
            ...loadState(res.data.userId),
            {
              userId: res.data.userId,
              id: uuid(),
              title: res.data.title,
              completed: false,
            },
          ]);
          /* let newTodoList = [
      ...todos,
      { userId, id: uuid(), title, completed: false },
    ];
    setTodos(newTodoList);
    saveState(selectedUser, newTodoList); */
          const uniqueIDs = Object.keys(localStorage).sort((a, b) => a - b);
          setUsers(uniqueIDs);
        }
      });
  };

  const updateTodo = (todo) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        todo,
      })
      .then((res) => {
        console.log(res);
        console.log(loadState(res.data.todo.userId));
        const newList = loadState(res.data.todo.userId).map((storageTodo) => {
          if (storageTodo.id === res.data.todo.id) {
            console.log("PÄIVITYS");
            return res.data.todo;
          } else return storageTodo;
        });
        console.log(newList);
        saveState(res.data.todo.userId, newList);
        setTodos(loadState(selectedUser));
      });
  };

  const removeTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => {
        if (res.status === 200) {
          let newTodoList = todos.filter((todo) => todo.id !== id);
          setTodos(newTodoList);
          saveState(selectedUser, newTodoList);
          if (todos.length === 1) {
            localStorage.removeItem(selectedUser);
            setUsers(Object.keys(localStorage).sort((a, b) => a - b));
            setSelectedUser(users[0]);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClearButton = () => {
    setTodos([]);
    clearState();
  };

  const toggleCompleteStatus = async (id, completed) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed: !completed,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(
            `Vastaus saatu JSONPlaceholderista, muutetaan completed-status lokaalisti`
          );
          let newTodoList = todos.map((todo) => {
            return todo.id === id
              ? { ...todo, completed: !todo.completed }
              : todo;
          });
          setTodos(newTodoList);
          saveState(selectedUser, newTodoList);
        }
      })
      .catch((err) => console.log(err));
  };

  // Tämä tehdään vain localstoragessa, koska sinne tallennettu data omilla avaimillaan
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
        updateTodo={updateTodo}
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
        <DropDown options={users} setSelectedUser={setSelectedUser} />
        {renderedTodos}
      </div>
    </div>
  );
};

export default App;
