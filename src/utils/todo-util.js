import axios from "axios";
import { v4 as uuid } from "uuid";
import { loadState, saveState } from "./localStorage";

const addTodo = (todo, selectedUser, setUsers, setTodos) => {
  console.log(todo);
  axios
    .post(`https://jsonplaceholder.typicode.com/todos/`, {
      userId: todo.userId,
      title: todo.title,
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
        const uniqueIDs = Object.keys(localStorage).sort((a, b) => a - b);
        setUsers(uniqueIDs);
        setTodos(loadState(selectedUser));
      }
    });
};

const updateTodo = (todo, todos, selectedUser, setTodos, copy) => {
  axios
    .put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      todo,
    })
    .then((res) => {
      // Päivitys samaan käyttäjälistaan
      if (res.data.todo.userId === selectedUser) {
        console.log("trigg");
        setTodos((previousState) => {
          return previousState.map((todo) =>
            todo.id !== res.data.todo.id ? todo : res.data.todo
          );
        });
        console.log(todos);
        // Päivitys eri käyttäjälistalle
      } else if (res.data.todo.userId !== selectedUser) {
        const newTodoList = [...loadState(res.data.todo.userId), res.data.todo];
        saveState(
          selectedUser,
          todos.filter((todo) => todo.id !== res.data.todo.id)
        );
        saveState(res.data.todo.userId, newTodoList);
      }
      // Kopio
      if (copy) {
        console.log(`Copy triggered: ${copy}. Todo: ${res.data.todo}`);
        console.log(res.data.todo);
        saveState(copy, [...loadState(copy), { ...res.data.todo, id: uuid() }]);
      }
    });
};

const removeTodo = (
  id,
  selectedUser,
  setSelectedUser,
  todos,
  setTodos,
  users,
  setUsers
) => {
  axios
    .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then((res) => {
      if (res.status === 200) {
        setTodos((previousState) => {
          return previousState.filter((todo) => todo.id !== id);
        });

        if (todos.length === 0) {
          localStorage.removeItem(selectedUser);
          setUsers(Object.keys(localStorage).sort((a, b) => a - b));
          setSelectedUser(users[0]);
          setTodos(selectedUser);
        }
      }
    })
    .catch((err) => console.log(err));
};

const toggleCompleteStatus = (id, completed, setTodos) => {
  axios
    .put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: !completed,
    })
    .then((res) => {
      if (res.status === 200) {
        setTodos((previousState) => {
          return previousState.map((todo) => {
            return todo.id === res.data.id
              ? { ...todo, completed: res.data.completed }
              : todo;
          });
        });
      }
    })
    .catch((err) => console.log(err));
};

// Tämä tehdään vain localstoragessa, koska sinne tallennettu data omilla avaimillaan
const moveItem = (id, toPosition, selectedUser, todos, setTodos) => {
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

export { addTodo, updateTodo, removeTodo, toggleCompleteStatus, moveItem };
