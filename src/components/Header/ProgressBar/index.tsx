import { useEffect, useState } from "react";
import { useSelector } from "helpers/store";

import styles from "./ProgressBar.module.scss";

const ProgressBar = () => {
	const countrySlice = useSelector(state => state.countries);
	const roundInfoSlice = useSelector(state => state.roundInfo);

	const [progress, setProgress] = useState(0);

	const totalCorrectAnswers = countrySlice.mainCountry?.borders?.length ?? 0;

	useEffect(() => {
		const progress = (100 * roundInfoSlice.rightAnswers) / totalCorrectAnswers;
		setProgress(progress);
	}, [countrySlice.mainCountry, roundInfoSlice.rightAnswers]);

	return (
		<section id="progress" className={styles["progress-bar"]}>
			<div
				id="current-progress"
				style={{ width: progress + "%" }}
				className={styles["progress-bar__persentage"]}
			></div>
		</section>
	);
};

export default ProgressBar;
