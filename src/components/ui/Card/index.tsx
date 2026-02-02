import { cn } from "@/helpers/util";

export const Card = ({
	className = "",
	children,
	...restProps
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"rounded-3xl transition-shadow duration-200 ease-out hover:shadow-2xl",
			className,
		)}
		{...restProps}
	>
		{children}
	</div>
);
