import { Component } from "react";

import { Modal } from "@/components/ui/Modal";

interface State {
	error: Error | null;
}

export class ErrorBoundary extends Component<
	{ children: React.ReactNode },
	State
> {
	override state: State = {
		error: null,
	};

	static getDerivedStateFromError(error: Error) {
		return { error };
	}

	override render() {
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
