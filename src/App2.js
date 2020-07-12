import React, { useState } from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import { v4 as uuid } from "uuid";

const App2 = () => {
  const [todos, setTodos] = useState([
    { id: uuid(), name: "Go to the supermarket", complete: false },
    { id: uuid(), name: "Call Alice", complete: false },
    { id: uuid(), name: "Ask Alice to call Bob", complete: false },
    { id: uuid(), name: "Do the dishes", complete: false },
    { id: uuid(), name: "Change car tyres", complete: false },
  ]);

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
          todo.complete = !todo.complete;
          return todo;
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
      />
    );
  });

  return (
    <div className="container">
      <AddTodo onSubmit={addTodo} />
      {renderedTodos}
    </div>
  );
};

export default App2;
