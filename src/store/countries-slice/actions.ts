import { getAxiosError } from "helpers/axios";
import {
	fetchCountries,
	filterCountries,
	pickMainCountry,
} from "helpers/country";
import { ActionCreatorThunk } from "types/store.types";

import { countriesActions } from "./reducers";

export const fetchAllCountries: ActionCreatorThunk<
	ReturnType<typeof getAxiosError>
> = () => async dispatch => {
	const countries = await fetchCountries();

	if ("errors" in countries) {
		return countries.errors;
	}

	dispatch(countriesActions.storeCountries(countries));
};

export const changeMainCountry: ActionCreatorThunk =
	() => async (dispatch, getState) => {
		const state = getState();

		const borderedCountries = filterCountries(state.countries.countries);

		const mainCountry = pickMainCountry(
			borderedCountries,
			state.countries.history,
		);

		dispatch(countriesActions.storeMainCountry(mainCountry));
	};
