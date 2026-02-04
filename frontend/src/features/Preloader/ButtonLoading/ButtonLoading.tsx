import styles from "./ButtonLoading.module.scss";

interface IButtonLoadingProps {
	dotsColor?: string;
}

/**
 * Компонент индикатора загрузки в виде трёх точек.
 *
 * Анимированный спиннер, состоящий из трёх точек, используется для визуального
 * отображения состояния загрузки в интерфейсе.
 */
export function ButtonLoading({ dotsColor = "#ffffff" }: IButtonLoadingProps) {
	const dotBgColor = { backgroundColor: dotsColor };

	return (
		<div className={styles["loading-spinner"]}>
			<div className={styles["loading-dot"]} style={dotBgColor} />
			<div className={styles["loading-dot"]} style={dotBgColor} />
			<div className={styles["loading-dot"]} style={dotBgColor} />
		</div>
	);
}
