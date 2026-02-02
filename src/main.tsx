import { StrictMode } from "react";
import ErrorBoundary from "components/ErrorBoundary";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "store";

import App from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<ErrorBoundary>
			<Provider store={store}>
				<App />
			</Provider>
		</ErrorBoundary>
	</StrictMode>,
);
