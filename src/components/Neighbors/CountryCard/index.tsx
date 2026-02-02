import { useEffect, useState } from "react";
import Card from "components/UI/Card";
import { useDispatch, useSelector } from "helpers/store";
import { getEmojiForCountry } from "helpers/util";
import { roundActions } from "store/round-info-slice/reducers";
import type ICountry from "types/country-api.types.js";

import styles from "./CountryCard.module.scss";

const CountryCard = ({ country }: { country: ICountry }) => {
	const countrySlice = useSelector(state => state.countries);
	const roundInfoSlice = useSelector(state => state.roundInfo);
	const dispatch = useDispatch();

	const [cardState, setCardState] = useState<string | null>(null);

	useEffect(() => {
		if (cardState === CardStateOptions.Correct) return;

		// Validate card
		if (roundInfoSlice.hasGameEnded && isCardCorrect) {
			setCardState(CardStateOptions.NotFound);
		}
	}, [roundInfoSlice.hasGameEnded]);

	const isCardCorrect = countrySlice.mainCountry?.borders.includes(
		country.cca3,
	);

	const handleCardClick = () => {
		if (cardState) return;

		if (isCardCorrect) {
			dispatch(roundActions.correctAnswer());
			// gameInfo.correctAnswer();
			setCardState(CardStateOptions.Correct);
		} else {
			dispatch(roundActions.incorrectAnswer());
			// gameInfo.incorrectAnswer();
			setCardState(CardStateOptions.Incorrect);
		}
	};

	return (
		<Card
			className={`${styles["country-card"]} ${
				cardState ? styles[cardState] : ""
			}`}
			onClick={handleCardClick}
		>
			<div className={styles["country-card__icon"]}>
				{getEmojiForCountry(country.cca2)}
			</div>
			<p className={styles["country-card__text"]}>{country.name.common}</p>
		</Card>
	);
};

export default CountryCard;

enum CardStateOptions {
	Correct = "correct",
	Incorrect = "incorrect",
	NotFound = "not-found",
}
