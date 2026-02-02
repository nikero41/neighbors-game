import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import App from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);

const client = new QueryClient();

root.render(
	<StrictMode>
		<ErrorBoundary>
			<QueryClientProvider client={client}>
				<App />
			</QueryClientProvider>
		</ErrorBoundary>
	</StrictMode>,
);
