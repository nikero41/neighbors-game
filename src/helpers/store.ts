import {
	TypedUseSelectorHook,
	useDispatch as useReduxDispach,
	useSelector as useReduxSelector,
} from "react-redux";
import type { AppDispatch, RootState } from "types/store.types";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispach<AppDispatch>();
