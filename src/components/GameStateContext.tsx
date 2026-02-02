import {
	createContext,
	useContext,
	useEffect,
	useEffectEvent,
	useReducer,
	useState,
} from "react";

import { pickMainCountry, type Country } from "@/helpers/country";
import {
	GameStage,
	gameStateReducer,
	type GameState,
} from "@/helpers/gameState";

interface GameAction {
	nextRound: () => void;
	resetRound: () => void;
	submitCountry: (country: Country) => { correct: boolean };
}

interface GameStateData {
	gameState: GameState;
	gameAction: GameAction;
}

const GameStateContext = createContext<GameStateData | null>(null);

export const GameStateProvider = ({
	children,
	countries,
}: {
	children: React.ReactNode;
	countries: Country[] | undefined;
}) => {
	const [history, setHistory] = useState<string[]>([]);
	const [gameState, dispatch] = useReducer(gameStateReducer, {
		round: 1,
		score: 0,
		rightAnswers: 0,
		wrongAnswers: 0,
		stage: GameStage.OnGoing,
		mainCountry: null,
	});

	const gameAction: GameAction = {
		nextRound: () => {
			if (!countries) return;
			const mainCountry = pickMainCountry(countries, history);
			setHistory(prevValue => [...prevValue, mainCountry.name.common]);
			dispatch({ type: "nextRound", mainCountry });
		},
		resetRound: () => {
			if (!countries) return;
			const mainCountry = pickMainCountry(countries, history);
			setHistory(prevValue => [...prevValue, mainCountry.name.common]);
			dispatch({ type: "resetRound", mainCountry });
		},
		submitCountry: country => {
			if (!countries) return { correct: false };

			const isCorrect = gameState.mainCountry?.borders.includes(country.cca3);
			dispatch({ type: "submitCountry", isCorrect: !!isCorrect });
			return { correct: !!isCorrect };
		},
	};

	const setupGame = useEffectEvent(() => {
		if (!countries) return;
		gameAction.resetRound();
	});

	useEffect(() => {
		if (!countries) return;
		setupGame();
	}, [countries]);

	return (
		<GameStateContext value={{ gameState, gameAction }}>
			{children}
		</GameStateContext>
	);
};

export const useGameState = () => {
	const context = useContext(GameStateContext);

	if (context == null) {
		throw new Error("useGameState must be used within a GameStateProvider");
	}

	return context;
};
