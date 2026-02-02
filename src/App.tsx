import { useQuery } from "@tanstack/react-query";

import "./globals.css";

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
			<div className="m-10 grid-cols-[1fr_4fr] gap-1.5 md:grid">
				<Sidebar />
				<main className="space-y-1.5">
					<Title />
					<ProgressBar />
					{isSuccess && <CountryCardsGrid countries={countries} />}
				</main>
			</div>
		</GameStateProvider>
	);
};

export default App;
