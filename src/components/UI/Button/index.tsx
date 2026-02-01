import { ReactNode } from "react";

import styles from "./Button.module.scss";

interface Props {
	active?: boolean;
	children?: ReactNode;
	className?: string;
	[buttonProperties: string]: any;
}

const Button: React.FC<Props> = ({
	active = true,
	children,
	onClick,
	className,
	...buttonProperties
}) => {
	return (
		<p
			className={`${styles["btn"]} ${
				active ? styles["btn--active"] : styles["btn--inactive"]
			} ${className ?? ""}`}
			onClick={active ? (onClick ?? undefined) : undefined}
			{...buttonProperties}
		>
			{children}
		</p>
	);
};

export default Button;
