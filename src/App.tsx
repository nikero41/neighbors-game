import { useQuery } from "@tanstack/react-query";

import "./global.scss";

import { CountryCardsGrid } from "@/components/CountryCardsGrid";
import { GameStateProvider } from "@/components/GameStateContext";
import { ProgressBar } from "@/components/ProgressBar";
import { Sidebar } from "@/components/Sidebar";
import { Title } from "@/components/Title";
import { fetchCountries } from "@/helpers/country";

const App = () => {
	const { data: countries, isSuccess } = useQuery({
		queryKey: ["countries"],
		queryFn: fetchCountries,
	});

	return (
		<GameStateProvider countries={countries}>
			<div className="game-panel">
				<Sidebar />
				<main>
					<Title />
					<ProgressBar />
					{isSuccess && <CountryCardsGrid countries={countries} />}
				</main>
			</div>
		</GameStateProvider>
	);
};

export default App;
