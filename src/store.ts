import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";

/**
 * Redux store configuration using the `configureStore` function from @reduxjs/toolkit.
 * The store has a single reducer, `authSlice`, responsible for managing authentication state.
 */
export const store = configureStore({
  reducer: { auth: authSlice },
});

/**
 * Type representing the state structure of the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type representing the dispatch function of the Redux store.
 */
export type AppDispatch = typeof store.dispatch;
