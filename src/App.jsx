import TodoList from "./TodoList/TodoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { todos } from "./TodoList/data";
import { useEffect, useState } from "react";
import { TodesProvider, TodoContext } from "./Context/TodoContext";

const theam = createTheme({
  typography: {
    fontFamily: "Alexandria",
  },
});

export default function App() {
  const [todosList, setTodoList] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    return savedTodos || todos;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosList));
  }, [todosList]);

  return (
    <ThemeProvider theme={theam}>
      <TodesProvider>
        <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            direction: "rtl ",
          }}
        >
          {/* <TodoContext.Provider value={{ todosList, setTodoList }}> */}
          <TodoList />
          {/* </TodoContext.Provider> */}
        </div>
      </TodesProvider>
    </ThemeProvider>
  );
}
