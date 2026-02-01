import { StrictMode } from "react";
import ErrorBoundary from "components/ErrorBoundary";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "store";

import App from "./App";

ReactDOM.render(
	<StrictMode>
		<ErrorBoundary>
			<Provider store={store}>
				<App />
			</Provider>
		</ErrorBoundary>
	</StrictMode>,
	document.getElementById("root"),
);
