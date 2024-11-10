import { createContext, useContext, useReducer } from "react";
import todosReducer from "../reducer/todosReducer";

export const TodoContext = createContext([]);

export const TodesProvider = ({ childern }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  <TodoContext.Provider value={{ todos: todos, dispatch: dispatch }}>
    {childern}
  </TodoContext.Provider>;
};

export const useTodos = () => {
  return useContext(TodoContext);
};
