import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "../store";

/**
 * Custom hook providing access to the Redux dispatch function.
 * Usage: const dispatch = useAppDispatch();
 * @returns {AppDispatch} The Redux dispatch function.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Custom hook providing strongly-typed access to the Redux store's state.
 * Usage: const state = useAppSelector((state) => state.someSlice.someValue);
 * @type {TypedUseSelectorHook<RootState>}
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
