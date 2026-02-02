import { useGameState } from "@/components/GameStateContext";

export const ProgressBar = () => {
	const {
		gameState: { mainCountry, rightAnswers },
	} = useGameState();

	const totalCorrectAnswers = mainCountry?.borders.length ?? 0;
	const progress =
		totalCorrectAnswers > 0 ? (100 * rightAnswers) / totalCorrectAnswers : 0;

	return (
		<section className="sticky top-1.5 z-10 h-6 overflow-hidden rounded-lg bg-gray-300 md:static">
			<div
				style={{ width: `${progress}%` }}
				className="h-full rounded-xl bg-secondary transition-[width] duration-150 ease-in-out"
			/>
		</section>
	);
};
