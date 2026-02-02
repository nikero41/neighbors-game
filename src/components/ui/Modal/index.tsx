import { createPortal } from "react-dom";

import { Card } from "@/components/ui/Card";

const Backdrop = () => (
	<div className="absolute inset-0 z-10 rounded-2xl bg-black/50" />
);

const overlaysDivElement = document.querySelector<HTMLDivElement>("#overlays");
if (!overlaysDivElement) throw new Error("overlaysDivElement not found");

export const Modal = ({
	teleport,
	header,
	actions,
	children,
}: {
	teleport?: boolean;
	header?: string;
	actions?: React.ReactNode;
	children?: React.ReactNode;
}) => {
	const modal = (
		<>
			<Backdrop />

			<Card className="absolute top-1/2 left-1/2 z-20 w-4/5 max-w-96 -translate-1/2 transform overflow-hidden rounded-3xl bg-white">
				{header && (
					<header className="bg-primary p-4 text-2xl text-white">
						{header}
					</header>
				)}

				<main className="px-4 py-5">{children}</main>

				{actions && <footer className="px-4 text-right">{actions}</footer>}
			</Card>
		</>
	);

	if (teleport) {
		return createPortal(modal, overlaysDivElement);
	}
	return modal;
};
