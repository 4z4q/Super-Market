import { v4 as uuidv4 } from "uuid";

export default function todosReducer(state, action) {
  switch (action.type) {
    case "Get": {
      const savedTodos = JSON.parse(localStorage.getItem("todos"));
      return savedTodos || state;
    }

    case "ADD": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        details: "",
        finsh: false,
      };

      const updatedTodos = [...state, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "UPDATE": {
      const updatedList = state.map((prevTodosList) =>
        prevTodosList.id === action.payload.id
          ? { ...prevTodosList, [action.payload.name]: action.payload.value }
          : prevTodosList
      );

      localStorage.setItem("todos", JSON.stringify(updatedList));
      return updatedList;
    }


    

    case "DELETE": {
      const updatedList = state.filter((todo) => action.payload.id !== todo.id);
      localStorage.setItem("todos", JSON.stringify(updatedList));
      return updatedList;
    }

    default:
      throw new Error("Unknown action");
  }
}
