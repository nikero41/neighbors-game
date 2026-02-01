import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type ICountry from "types/country-api.types";
import { IMainCountry } from "types/country.types";

interface CountriesState {
	mainCountry: IMainCountry | null;
	countries: ICountry[];
	history: string[];
}

const initialState: CountriesState = {
	mainCountry: null,
	countries: [],
	history: [],
};

const countriesSlice = createSlice({
	name: "countries",
	initialState,
	reducers: {
		storeCountries(store, { payload }: PayloadAction<ICountry[]>) {
			store.countries = payload;
		},

		storeMainCountry(state, { payload }: PayloadAction<IMainCountry>) {
			state.mainCountry = payload;
			state.history.push(payload.name.common);
		},
	},
});

export const countriesActions = countriesSlice.actions;
export default countriesSlice.reducer;
