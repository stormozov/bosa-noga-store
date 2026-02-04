import "./ContentPreloader.scss";

/**
 * Компонент прелоадера контента.
 *
 * Отображает простую анимацию загрузки в виде четырёх точек (или блоков),
 * используемую для визуального индикатора ожидания загрузки контента.
 */
export function ContentPreloader() {
	return (
		<div className="content-preloader">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
}
