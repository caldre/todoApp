import axios from "axios";

const baseUrl = "http://localhost:3001/todos";

const TodoService = {
  getData: () => {
    const request = axios.get(baseUrl);
    return request;
  },
};

export default TodoService;
