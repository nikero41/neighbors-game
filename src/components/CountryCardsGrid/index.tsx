import { useMemo, useState } from "react";

import { useGameState } from "@/components/GameStateContext";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { generateCountriesGrid, type Country } from "@/helpers/country";
import { GameStage } from "@/helpers/gameState";
import { cn, getEmojiForCountry } from "@/helpers/util";

export const CountryCardsGrid = ({ countries }: { countries: Country[] }) => {
	const {
		gameState: { mainCountry, stage, round },
	} = useGameState();

	const gridCountries = useMemo(() => {
		if (!mainCountry) return [];
		return generateCountriesGrid(countries, mainCountry);
	}, [mainCountry, countries]);

	return (
		<section className="relative grid auto-cols-fr grid-cols-2 place-items-center gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
			{stage !== GameStage.OnGoing && (
				<Modal header="Game over">
					{stage === GameStage.Won
						? "You won! Congratulations!"
						: "You lost. Try again!"}
				</Modal>
			)}
			{gridCountries.map(country => (
				<CountryCard key={`${round}-${country.cca3}`} country={country} />
			))}
		</section>
	);
};

const CountryCard = ({ country }: { country: Country }) => {
	const {
		gameState: { mainCountry, stage },
		gameAction,
	} = useGameState();

	const [cardState, setCardState] = useState<CardStateOptions | null>(null);

	const isCardCorrect = mainCountry?.borders.includes(country.cca3);

	const handleCardClick = () => {
		if (cardState || stage !== GameStage.OnGoing) return;
		const { correct } = gameAction.submitCountry(country);
		setCardState(
			correct ? CardStateOptions.Correct : CardStateOptions.Incorrect,
		);
	};

	return (
		<Card
			className={cn(
				"flex h-52 w-40 cursor-pointer flex-col items-center justify-evenly px-2 text-center transition-colors duration-500 ease-out hover:bg-orange-100",
				{
					"bg-neutral-200": cardState,
					"border-4 border-emerald-600": cardState === CardStateOptions.Correct,
					"border-4 border-red-600": cardState === CardStateOptions.Incorrect,
					"border-4 border-amber-500":
						stage !== GameStage.OnGoing &&
						isCardCorrect &&
						cardState !== CardStateOptions.Correct,
				},
			)}
			onClick={handleCardClick}
		>
			<div className="w-full font-[TwemojiMozilla] text-7xl">
				{getEmojiForCountry(country.cca2)}
			</div>
			<p className="max-w-full truncate text-xl text-wrap">
				{country.name.common}
			</p>
		</Card>
	);
};

enum CardStateOptions {
	Correct = "correct",
	Incorrect = "incorrect",
	NotFound = "not-found",
}
