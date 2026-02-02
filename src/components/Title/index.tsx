import { useGameState } from "@/components/GameStateContext";
import { getEmojiForCountry } from "@/helpers/util";
import styles from "./Title.module.scss";

export const Title = () => {
	const {
		gameState: { mainCountry },
	} = useGameState();

	return (
		<section className={styles["selected-country"]}>
			<span className={styles["selected-country__flag"]}>
				{mainCountry?.cca2 && getEmojiForCountry(mainCountry.cca2)}
			</span>
			<h1 className={styles["selected-country__name"]}>
				{mainCountry?.name.common ?? "Loading..."}
			</h1>
		</section>
	);
};
