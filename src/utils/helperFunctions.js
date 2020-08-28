/* const handleDarkModeClick = () => {
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

const handleClearButton = () => {
  setTodos([]);
  localStorage.clear();
}; */

const toggleCompleteStatus = (array, id, saveState, setTodos) => {
  let newTodoList = array.map((todo) => {
    return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
  });
  setTodos(newTodoList);
  saveState(newTodoList);
};

/* const moveArrayItemToNewIndex = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

const shiftPosition = (id, shift) => {
  let index = todos.indexOf({ id });
  let newIndex = index + shift;
}; */
export { toggleCompleteStatus };
