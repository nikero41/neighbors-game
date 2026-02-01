import { Component } from "react";
import Modal from "components/UI/Modal";

interface State {
	error: Error | null;
}

class ErrorBoundary extends Component<{}, State> {
	state: State = {
		error: null,
	};

	static getDerivedStateFromError(error: Error) {
		return { error: error };
	}

	render() {
		if (this.state.error) {
			return (
				<Modal
					teleport
					header="An error occured"
					body={this.state.error.message}
				/>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
