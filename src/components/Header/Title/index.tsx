import React, { memo } from "react";
import { getEmojiForCountry } from "helpers/util";
import { IMainCountry } from "types/country.types";

import styles from "./Title.module.scss";

interface Props {
	country: IMainCountry | null;
}

const Title: React.FC<Props> = props => {
	const mainCountry = props.country;

	return (
		<section className={styles["selected-country"]}>
			<span className={styles["selected-country__flag"]}>
				{mainCountry?.cca2 && getEmojiForCountry(mainCountry?.cca2)}
			</span>
			<h1 className={styles["selected-country__name"]}>
				{mainCountry?.name.common ?? "Loading..."}
			</h1>
		</section>
	);
};

export default memo(Title);
