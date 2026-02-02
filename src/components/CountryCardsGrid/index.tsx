import { useMemo, useState } from "react";

import { useGameState } from "@/components/GameStateContext";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import type { Country } from "@/helpers/country";
import { GameStage } from "@/helpers/gameState";
import { getEmojiForCountry, shuffleArray } from "@/helpers/util";
import cardStyles from "./CountryCard.module.scss";
import styles from "./CountryCardsGrid.module.scss";

export const CountryCardsGrid = ({
	countries,
}: {
	countries: Country[] | undefined;
}) => {
	const {
		gameState: { mainCountry, stage, round },
	} = useGameState();

	const gridCountries = useMemo(() => {
		if (!mainCountry || !countries) return [];

		const selectedCountries = [
			...countries.filter(country =>
				mainCountry.borders.includes(country.cca3),
			),
		];
		const shuffledCountries = shuffleArray<Country>([...countries]);

		for (
			let i = 0;
			selectedCountries.length < mainCountry.borders.length * 3;
			i++
		) {
			const randomCountry = shuffledCountries[i];
			if (!randomCountry) throw new Error("Failed to pick random country");
			if (
				!mainCountry.borders.includes(randomCountry.cca3) &&
				!(shuffledCountries[i] === mainCountry)
			)
				selectedCountries.push(randomCountry);
		}

		return shuffleArray(selectedCountries);
	}, [mainCountry, countries]);

	return (
		<section className={styles["neighbours"]}>
			{stage !== GameStage.OnGoing && (
				<Modal
					header="Game over"
					body={
						stage === GameStage.Won
							? "You won! Congratulations!"
							: "You lost. Try again!"
					}
				/>
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
	const showNotFound =
		stage !== GameStage.OnGoing &&
		isCardCorrect &&
		cardState !== CardStateOptions.Correct;

	const handleCardClick = () => {
		if (cardState || stage !== GameStage.OnGoing) return;
		const { correct } = gameAction.submitCountry(country);
		setCardState(
			correct ? CardStateOptions.Correct : CardStateOptions.Incorrect,
		);
	};

	return (
		<Card
			className={`${cardStyles["country-card"] ?? ""} ${
				cardState ? (cardStyles[cardState] ?? "") : ""
			} ${showNotFound ? (cardStyles["not-found"] ?? "") : ""}`}
			onClick={handleCardClick}
		>
			<div className={cardStyles["country-card__icon"]}>
				{getEmojiForCountry(country.cca2)}
			</div>
			<p className={cardStyles["country-card__text"]}>{country.name.common}</p>
		</Card>
	);
};

enum CardStateOptions {
	Correct = "correct",
	Incorrect = "incorrect",
	NotFound = "not-found",
}
