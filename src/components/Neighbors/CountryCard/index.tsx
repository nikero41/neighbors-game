import { useEffect, useState } from "react";
import Card from "components/UI/Card";
import { useDispatch, useSelector } from "helpers/store";
import { getEmojiForCountry } from "helpers/util";
import { roundActions } from "store/round-info-slice/reducers";
import type ICountry from "types/country-api.types.js";

import styles from "./CountryCard.module.scss";

const cardStateOptions = {
	correct: "correct",
	incorrect: "incorrect",
	notFound: "not-found",
};

interface Props {
	country: ICountry;
}

const CountryCard: React.FC<Props> = props => {
	const countrySlice = useSelector(state => state.countries);
	const roundInfoSlice = useSelector(state => state.roundInfo);
	const dispatch = useDispatch();

	const [cardState, setCardState] = useState<string | null>(null);

	useEffect(() => {
		if (cardState === cardStateOptions.correct) return;

		// Validate card
		if (roundInfoSlice.hasGameEnded && isCardCorrect) {
			setCardState(cardStateOptions.notFound);
		}
	}, [roundInfoSlice.hasGameEnded]);

	const isCardCorrect = countrySlice.mainCountry?.borders.includes(
		props.country.cca3,
	);

	const handleCardClick = () => {
		if (isCardCorrect) {
			dispatch(roundActions.correctAnswer());
			// gameInfo.correctAnswer();
			setCardState(cardStateOptions.correct);
		} else {
			dispatch(roundActions.incorrectAnswer());
			// gameInfo.incorrectAnswer();
			setCardState(cardStateOptions.incorrect);
		}
	};

	return (
		<Card
			className={`${styles["country-card"]} ${
				cardState ? styles[cardState] : null
			}`}
			onClick={!cardState ? handleCardClick : null}
		>
			<div className={styles["country-card__icon"]}>
				{getEmojiForCountry(props.country.cca2)}
			</div>
			<p className={styles["country-card__text"]}>
				{props.country.name.common}
			</p>
		</Card>
	);
};

export default CountryCard;
