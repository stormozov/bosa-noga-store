import classNames from "classnames";
import "./SearchWidget.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link SearchWidget}.
 */
interface ISearchWidgetProps {
	classes?: string;
}

/**
 * Компонент виджета поиска.
 * 
 * Отображает иконку поиска.
 */
export function SearchWidget({ classes }: ISearchWidgetProps) {
	return (
		<div className="search-widget">
			<button
				type="button"
				data-id="search-expander"
				className={classNames("search-widget__expander", classes)}
			></button>
		</div>
	);
}
