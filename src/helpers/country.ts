import axios, { AxiosError } from "axios";
import { getAxiosError } from "helpers/axios";
import { shuffleArray } from "helpers/util";
import type ICountry from "types/country-api.types";
import { IMainCountry } from "types/country.types";

export const fetchCountries = async () => {
	try {
		const response = await axios.get<ICountry[]>(
			"https://restcountries.com/v3.1/all",
			{ params: { fields: "name,cca2,cca3,borders" } },
		);

		return response.data;
	} catch (error) {
		return { errors: getAxiosError(error as AxiosError) };
	}
};

export const pickMainCountry = (
	countries: ICountry[],
	history: string[],
): IMainCountry => {
	try {
		const mainCountry = shuffleArray<ICountry>([...countries])[0];

		if (
			Array.isArray(mainCountry.borders) &&
			mainCountry.borders.length === 0
		) {
			throw "No borders found";
		}

		const isInHistory = history.includes(mainCountry.name.common);
		if (isInHistory) {
			throw "Country already in history";
		}

		return mainCountry as IMainCountry;
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		return pickMainCountry(countries, history);
	}
};

export const filterCountries = (countries: ICountry[]): ICountry[] =>
	countries.filter((country: ICountry) =>
		Array.isArray(country.borders) ? country.borders.length > 0 : false,
	);

export const cardPick = (
	mainCountry: IMainCountry,
	countries: ICountry[],
): ICountry[] => {
	const selectedCountries = [
		...countries.filter(country => mainCountry.borders.includes(country.cca3)),
	];
	const shuffledCountries = shuffleArray<ICountry>([...countries]);

	for (
		let i = 0;
		selectedCountries.length < mainCountry.borders!.length * 3;
		i++
	) {
		if (
			!mainCountry.borders?.includes(shuffledCountries[i].cca3) &&
			!(shuffledCountries[i] === mainCountry)
		)
			selectedCountries.push(shuffledCountries[i]);
	}

	return shuffleArray(selectedCountries);
};
