import * as z from "zod/mini";

import { shuffleArray } from "@/helpers/util";

export type Country = z.infer<typeof CountrySchema>;

export interface IMainCountry extends Country {
	borders: string[];
}

export const fetchCountries = async ({ signal }: { signal?: AbortSignal }) => {
	const response = await fetch(
		`https://restcountries.com/v3.1/all?${new URLSearchParams({
			fields: "name,cca2,cca3,borders",
		}).toString()}`,
		{ signal },
	);

	if (!response.ok) {
		throw new Error("Error fetching countries");
	}

	return z.array(CountrySchema).parse(await response.json());
};

export const CountrySchema = z.object({
	name: z.object({ common: z.string() }),
	cca2: z.string(),
	cca3: z.string(),
	borders: z.optional(z.array(z.string())),
});

export const pickMainCountry = (
	countries: Country[],
	history: string[],
): IMainCountry => {
	const countriesWithBorders = countries.filter(
		(country: Country) =>
			Array.isArray(country.borders) &&
			country.borders.length > 0 &&
			!history.includes(country.name.common),
	);

	const mainCountry =
		countriesWithBorders[
			Math.floor(Math.random() * countriesWithBorders.length)
		];
	if (!mainCountry) throw new Error("Failed to pick random country");

	return mainCountry as IMainCountry;
};

export const generateCountriesGrid = (
	countries: Country[],
	mainCountry: IMainCountry,
) => {
	const { borderCountries, nonBorderCountries } = countries.reduce(
		(acc, country) => {
			if (country.cca3 === mainCountry.cca3) return acc;

			const isBoardCountry = mainCountry.borders.includes(country.cca3);
			if (isBoardCountry) {
				acc.borderCountries.push(country);
				return acc;
			}

			acc.nonBorderCountries.push(country);
			return acc;
		},
		{ borderCountries: [] as Country[], nonBorderCountries: [] as Country[] },
	);

	const shuffledCountries = shuffleArray(nonBorderCountries).slice(
		0,
		mainCountry.borders.length * 2,
	);

	return shuffleArray([...borderCountries, ...shuffledCountries]);
};
