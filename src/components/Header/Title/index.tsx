import { memo } from "react";
import { getEmojiForCountry } from "helpers/util";
import { IMainCountry } from "types/country.types";

import styles from "./Title.module.scss";

const Title = ({ country }: { country: IMainCountry | null }) => (
	<section className={styles["selected-country"]}>
		<span className={styles["selected-country__flag"]}>
			{country?.cca2 && getEmojiForCountry(country.cca2)}
		</span>
		<h1 className={styles["selected-country__name"]}>
			{country?.name.common ?? "Loading..."}
		</h1>
	</section>
);

export default memo(Title);
