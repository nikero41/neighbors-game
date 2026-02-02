import type { Country } from "./country";

export interface GameState {
	round: number;
	score: number;
	rightAnswers: number;
	wrongAnswers: number;
	stage: GameStage;
	mainCountry: Country | null;
}

export type GameStatePayload =
	| { type: "nextRound"; mainCountry: Country }
	| { type: "resetRound"; mainCountry: Country }
	| { type: "submitCountry"; isCorrect: boolean };

export const gameStateReducer = (
	state: GameState,
	action: GameStatePayload,
) => {
	switch (action.type) {
		case "nextRound": {
			if (state.stage !== GameStage.Won) return state;
			return {
				...state,
				round: state.round + 1,
				rightAnswers: 0,
				wrongAnswers: 0,
				stage: GameStage.OnGoing,
				mainCountry: action.mainCountry,
			};
		}
		case "resetRound": {
			return {
				...state,
				round: 1,
				score: 0,
				rightAnswers: 0,
				wrongAnswers: 0,
				stage: GameStage.OnGoing,
				mainCountry: action.mainCountry,
			};
		}
		case "submitCountry": {
			const scoreChange = action.isCorrect ? 5 : -3;

			const newState = {
				...state,
				score: state.score + scoreChange,
				...(action.isCorrect
					? { rightAnswers: state.rightAnswers + 1 }
					: { wrongAnswers: state.wrongAnswers + 1 }),
			};

			const hasEnded =
				newState.mainCountry?.borders.length === newState.rightAnswers ||
				newState.mainCountry?.borders.length === newState.wrongAnswers;

			if (hasEnded) {
				return {
					...newState,
					stage:
						newState.rightAnswers > newState.wrongAnswers
							? GameStage.Won
							: GameStage.Lost,
				};
			}

			return newState;
		}
	}
};

export enum GameStage {
	Won,
	Lost,
	OnGoing,
}
