import { useGameState } from "@/components/GameStateContext";
import { Button } from "@/components/ui/Button";
import { GameStage } from "@/helpers/gameState";

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
		<aside className="mb-1.5 flex min-w-44 flex-col rounded-lg bg-primary px-6 py-5 text-white md:mb-0">
			<h1 className="text-3xl font-bold">
				Find
				<br />
				the Neighbors
			</h1>

			<div className="my-10 grid grid-cols-2 grid-rows-2 gap-6">
				<p>Round:</p>
				<p className="ml-auto">{round}</p>

				<p>Score:</p>
				<p className="ml-auto">{score}</p>
			</div>

			<Button
				className="mt-auto"
				disabled={stage !== GameStage.Won}
				onClick={gameAction.nextRound}
			>
				Next Country
			</Button>

			<Button className="mt-5" onClick={handleNewGameClick}>
				New Game
			</Button>
		</aside>
	);
};
