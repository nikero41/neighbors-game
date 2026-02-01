import { configureStore } from "@reduxjs/toolkit";

import countryReducer from "./countries-slice/reducers";
import roundInfoReducer from "./round-info-slice/reducers";

const store = configureStore({
	reducer: {
		roundInfo: roundInfoReducer,
		countries: countryReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: { ignoredPaths: ["countries/storeCountries"] },
			serializableCheck: { ignoredPaths: ["countries/storeCountries"] },
		}),
});

export default store;
