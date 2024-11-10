import Button from "@mui/material/Button";
import { useContext } from "react";
import { SnackbarContext } from "../Context/ToastContext";
import { SnackbarProvider, useSnackbar } from "notistack";
export default function MySnackBar() {
  const showSnackbar = useContext(SnackbarContext);


  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    enqueueSnackbar("This is a success message!", {
      variant: variant,
      autoHideDuration: 2000,
    });
  };
  return (
    <>
      <Button onClick={handleClickVariant("success")}>
        Show success snackbar
      </Button>
    </>
  );
}
