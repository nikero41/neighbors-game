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
		<aside className="mb-1.5 flex min-w-44 flex-col rounded-lg bg-primary px-6 text-white md:mb-0">
			<h1 className="mt-5 text-3xl font-bold">
				Find
				<br />
				the Neighbors
			</h1>

			<div className="mt-10 grid grid-cols-2 grid-rows-2 gap-6">
				<p>Round:</p>
				<p className="ml-auto">{round}</p>

				<p>Score:</p>
				<p className="ml-auto">{score}</p>
			</div>

			<Button
				className="mt-auto mb-5"
				disabled={stage !== GameStage.Won}
				onClick={gameAction.nextRound}
			>
				Next Country
			</Button>

			<Button className="mb-5" onClick={handleNewGameClick}>
				New Game
			</Button>
		</aside>
	);
};
