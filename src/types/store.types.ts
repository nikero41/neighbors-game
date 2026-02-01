import { Action, ThunkAction } from "@reduxjs/toolkit";
import store from "store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppAsyncThunk<T = void> = ThunkAction<
	Promise<T>,
	RootState,
	unknown,
	Action
>;
export type ActionCreatorThunk<T = void> = () => AppAsyncThunk<T>;
