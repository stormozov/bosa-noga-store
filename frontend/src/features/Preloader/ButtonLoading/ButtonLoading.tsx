import styles from "./ButtonLoading.module.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link ButtonLoading}.
 */
interface IButtonLoadingProps {
	/**
	 * Цвет точек индикатора загрузки.
	 *
	 * Указывает цвет фона для каждой из трёх точек спиннера. Поддерживает любые
	 * валидные CSS-значения цвета (HEX, RGB, название цвета и т.д.).
	 *
	 * Параметр не обязателен, по умолчанию цвет точек - белый.
	 *
	 * @example
	 * <LoadingSpinner dotsColor="#ff0000" />
	 */
	dotsColor?: string;
}

/**
 * Компонент индикатора загрузки в виде трёх точек.
 *
 * Анимированный спиннер, состоящий из трёх точек, используется для визуального
 * отображения состояния загрузки в интерфейсе.
 *
 * Цвет точек можно настраивать через свойство `dotsColor`.
 * По умолчанию цвет точек - белый.
 *
 * @example
 * <LoadingSpinner />
 *
 * @example
 * <LoadingSpinner dotsColor="#000000" />
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
