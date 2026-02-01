import Button from "components/UI/Button";
import { useDispatch, useSelector } from "helpers/store";
import { changeMainCountry } from "store/countries-slice/actions";
import { roundActions } from "store/round-info-slice/reducers";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
	const roundInfoSlice = useSelector(state => state.roundInfo);
	const dispatch = useDispatch();

	const handleNextRoundClick = () => {
		dispatch(roundActions.nextRound());
		dispatch(changeMainCountry());
	};

	const handleNewGameClick = () => {
		if (!confirm("Are you sure? You will lose all your progress!")) return;

		dispatch(roundActions.resetRound());
		dispatch(changeMainCountry());
	};

	return (
		<aside className={styles["sidebar"]} id="sidebar">
			<h1>
				Find
				<br />
				the Neighbors
			</h1>
			<div className={styles["sidebar__info-container"]}>
				<p className={styles["sidebar__info-container__label"]}>Round:</p>
				<p className={styles["sidebar__info-container__value"]}>
					{roundInfoSlice.round}
				</p>
				<p className={styles["sidebar__info-container__label"]}>Score:</p>
				<p className={styles["sidebar__info-container__value"]} id="score">
					{roundInfoSlice.score}
				</p>
			</div>
			<Button
				className={styles["sidebar__btn"]}
				active={roundInfoSlice.hasGameEnded}
				onClick={handleNextRoundClick}
			>
				Next Country
			</Button>
			<Button className={styles["sidebar__btn"]} onClick={handleNewGameClick}>
				New Game
			</Button>
		</aside>
	);
};

export default Sidebar;
