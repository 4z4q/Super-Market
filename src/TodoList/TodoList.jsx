import {
  Card,
  Container,
  CardContent,
  Typography,
  Button,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Todo from "./Todo";
// import { TodoContext } from "../Context/TodoContext";
import { useReducer } from "react";
import todosReducer from "../reducer/todosReducer";

export default function TodoList() {
  const [alignment, setAlignment] = useState("all");
  const [open, setOpen] = useState(false);
  const [dialogTodo, setDialogTodo] = useState();

  const [todosList, dispatch] = useReducer(todosReducer, []);

  const [openEdit, setOpenEdit] = useState(false);
  const [titleInput, setTitleInput] = useState("");

  const handleEditClickOpen = (todos) => {
    setDialogTodo(todos);
    setOpenEdit(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDialogTodo((prev) => ({
      ...prev,
      [name]: value,
    }));

    dispatch({
      type: "UPDATE",
      payload: {
        id: dialogTodo.id,
        name: name,
        value: value,
      },
    });

    console.log(dialogTodo);
  };

  const handleEditClickClose = () => {
    
    setOpenEdit(false);
  };

  const filteredTodos = useMemo(() => {
    return todosList.filter((todo) => {
      if (alignment === "all") return true;
      if (alignment === "finsh") return todo.finsh === true;
      if (alignment === "unfinsh") return todo.finsh === false;
      return true;
    });
  }, [todosList, alignment]);

  const handleChangeToggleButton = (newAlignment) => {
    setAlignment(newAlignment);
  };

  function handleDeleteOpen(todos) {
    setDialogTodo(todos);
    setOpen(true);
  }

  const todoJsx = filteredTodos.map((todo) => (
    <Todo
      key={todo.id}
      todos={todo}
      showDelete={handleDeleteOpen}
      showOpen={handleEditClickOpen}
    />
  ));

  const addTodo = () => {
    dispatch({
      type: "ADD",
      payload: { title: titleInput },
    });

    setTitleInput("");
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      dispatch({ type: "Get" });
    }
  }, []);

  const handleDeleteClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch({
      type: "DELETE",
      payload: { id: dialogTodo.id },
    });

    setOpen(false);
  };

  return (
    <>
      {/* Start Edit Dialog */}

      <Dialog
        style={{ direction: "rtl" }}
        open={openEdit}
        onClose={handleEditClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"تعديل المعلومات"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="عنوان المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo && dialogTodo.title}
            onChange={handleChange}
          />

          <TextField
            required
            margin="dense"
            id="details"
            name="details"
            label="تفاصيل المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo && dialogTodo.details}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditClickClose}
            autoFocus
            color="success"
            variant="contained"
          >
            تعديل
          </Button>
          <Button onClick={handleEditClickClose} color="inherit">
            الغاء
          </Button>
        </DialogActions>
      </Dialog>

      {/* End Edit Dialog */}

      {/* Start Delete Dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        open={open}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل تريد حذف هذه المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            عند حذف المهمة سيتم حذفها بشكل نهائي
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="error" variant="contained">
            حذف
          </Button>
          <Button onClick={handleDeleteClose} autoFocus color="inherit">
            الغاء
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Delete Dialog */}

      <Container maxWidth="sm">
        <Card
          sx={{ textAlign: "center" }}
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <CardContent>
            <Typography variant="h3" component="div">
              قائمة المهام
            </Typography>
            <Divider />
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChangeToggleButton}
              style={{
                direction: "ltr",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <ToggleButton value="unfinsh">غير المكتمل</ToggleButton>
              <ToggleButton value="finsh">المكتمل</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>

            {/* Render Todos List */}
            {todoJsx}

            <Grid container spacing={2} sx={{ mt: "20px" }}>
              <Grid
                item
                xs={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                />
              </Grid>

              <Grid xs={4} item>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                  onClick={addTodo}
                  disabled={titleInput.length > 0 ? false : true}
                >
                  أضافة مهمة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
