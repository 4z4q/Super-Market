import { createContext, useContext } from "react";

export const SnackbarContext = createContext({});

export const useSnackBarContext = () => useContext(SnackbarContext);

export default SnackbarContext;
