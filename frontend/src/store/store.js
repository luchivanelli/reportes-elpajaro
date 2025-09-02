import { configureStore } from "@reduxjs/toolkit";
import { incomeSlice } from "./features/incomeSlice";
import { expenseSlice } from "./features/expenseSlice";
import { selectsSlice } from "./features/selectsSlice";
import { loginSlice } from "./features/loginSlice";

export const store = configureStore({
  reducer: {
    [incomeSlice.reducerPath]: incomeSlice.reducer,
    [expenseSlice.reducerPath]: expenseSlice.reducer,
    [selectsSlice.reducerPath]: selectsSlice.reducer,
    [loginSlice.reducerPath]: loginSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(incomeSlice.middleware)
      .concat(expenseSlice.middleware)
      .concat(selectsSlice.middleware)
      .concat(loginSlice.middleware)
});