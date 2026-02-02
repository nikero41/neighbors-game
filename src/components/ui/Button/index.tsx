import styles from "./Button.module.scss";

export const Button = ({
	disabled,
	children,
	onClick,
	className = "",
	...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button
		className={`${styles["btn"] ?? ""} ${
			!disabled
				? (styles["btn--active"] ?? "")
				: (styles["btn--inactive"] ?? "")
		} ${className}`}
		onClick={onClick}
		{...restProps}
	>
		{children}
	</button>
);
