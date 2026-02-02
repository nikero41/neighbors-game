import { cn } from "@/helpers/util";

export const Button = ({
	children,
	onClick,
	className = "",
	...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button
		className={cn(
			"inline-block cursor-pointer rounded-xl bg-gray-50 py-2.5 text-center text-xs text-black hover:bg-gray-200 disabled:cursor-default disabled:bg-gray-300 disabled:text-gray-700",
			className,
		)}
		onClick={onClick}
		{...restProps}
	>
		{children}
	</button>
);
