import * as z from "zod/mini";

import { shuffleArray } from "@/helpers/util";

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

export const pickMainCountry = (
	countries: Country[],
	history: string[],
): IMainCountry => {
	const countriesWithBorders = countries.filter(
		(country: Country) =>
			Array.isArray(country.borders) && country.borders.length > 0,
	);
	const mainCountry = shuffleArray<Country>(countriesWithBorders)[0];
	if (!mainCountry) throw new Error("Failed to pick random country");

	const isInHistory = history.includes(mainCountry.name.common);
	if (isInHistory) {
		return pickMainCountry(countries, history);
	}

	return mainCountry as IMainCountry;
};

export const CountrySchema = z.object({
	name: z.object({ common: z.string() }),
	cca2: z.string(),
	cca3: z.string(),
	borders: z.optional(z.array(z.string())),
});

export type Country = z.infer<typeof CountrySchema>;

export interface IMainCountry extends Country {
	borders: string[];
}
