import {
  Card,
  CardContent,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";

export default function Todo({ todos, showDelete, showOpen }) {
  const { todosList, setTodoList } = useContext(TodoContext);

  function handelClickDelete() {
    showDelete(todos);
  }

  function handelClickEdit() {
    showOpen(todos);
  }

  const handelClick = () => {
    const updateTodos = todosList.map((todo) => {
      if (todos.id === todo.id) todo.finsh = !todo.finsh;
      return todo;
    });

    setTodoList(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  };

  return (
    <>
      <Card
        className="Todo"
        sx={{
          minWidth: 275,
          background: todos.finsh ? "#2e7d32" : "#1976d2",
          color: "white",
          marginTop: "20px",
        }}
      >
        <CardContent>
          <Grid2 container spacing={2} columnGap={2} justifyContent={"center"}>
            <Grid2 item size={{ xs: 12, sm: 8 }}>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todos.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ textAlign: "right", fontFamily: "Alexandria !important" }}
              >
                {todos.details}
              </Typography>
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 4 }}
              // gap={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-around"}
            >
              <IconButton
                onClick={handelClick}
                aria-label="create"
                className="IconButton"
                style={{
                  color: todos.finsh ? "white" : "#8bc34a",
                  border: "solid 3px #8bc34a",
                  background: todos.finsh ? "#8bc34a" : "white",
                }}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                onClick={handelClickEdit}
                aria-label="edit"
                className="IconButton"
                style={{
                  color: "#ffc107",
                  border: "solid 3px #ffc107",
                  background: "white",
                }}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                onClick={handelClickDelete}
                aria-label="delete"
                className="IconButton"
                style={{
                  color: "#f44336",
                  border: "solid 3px #f44336",
                  background: "white",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </>
  );
}
