import styles from "./Card.module.scss";

export const Card = ({
	className,
	children,
	...restProps
}: {
	children: React.ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => (
	<div className={`${styles["card"]} ${className ?? ""}`} {...restProps}>
		{children}
	</div>
);
