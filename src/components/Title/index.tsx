import { useGameState } from "@/components/GameStateContext";
import { getEmojiForCountry } from "@/helpers/util";

export const Title = () => {
	const {
		gameState: { mainCountry },
	} = useGameState();

	return (
		<section className="flex items-center gap-3 rounded-lg bg-gray-500 p-4 text-4xl text-white">
			<span className="font-[TwemojiMozilla]">
				{mainCountry?.cca2 && getEmojiForCountry(mainCountry.cca2)}
			</span>
			<h1>{mainCountry?.name.common ?? "Loading..."}</h1>
		</section>
	);
};
