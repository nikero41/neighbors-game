import styles from "./Button.module.scss";

export const Button = ({
	active = true,
	children,
	onClick,
	className,
	...restProps
}: { active?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button
		className={`${styles["btn"]} ${
			active ? styles["btn--active"] : styles["btn--inactive"]
		} ${className ?? ""}`}
		onClick={active ? (onClick ?? undefined) : undefined}
		{...restProps}
	>
		{children}
	</button>
);
