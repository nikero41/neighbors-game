import { useGameState } from "@/components/GameStateContext";
import { Button } from "@/components/ui/Button";
import { GameStage } from "@/helpers/gameState";
import styles from "./Sidebar.module.scss";

export const Sidebar = () => {
	const {
		gameState: { round, score, stage },
		gameAction,
	} = useGameState();

	const handleNewGameClick = () => {
		if (!confirm("Are you sure? You will lose all your progress!")) return;
		gameAction.resetRound();
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
				<p className={styles["sidebar__info-container__value"]}>{round}</p>
				<p className={styles["sidebar__info-container__label"]}>Score:</p>
				<p className={styles["sidebar__info-container__value"]} id="score">
					{score}
				</p>
			</div>

			<Button
				className={styles["sidebar__btn"]}
				disabled={stage !== GameStage.Won}
				onClick={gameAction.nextRound}
			>
				Next Country
			</Button>

			<Button className={styles["sidebar__btn"]} onClick={handleNewGameClick}>
				New Game
			</Button>
		</aside>
	);
};
