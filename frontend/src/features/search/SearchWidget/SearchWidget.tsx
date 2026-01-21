import classNames from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router";

import { type ISearchFormProps, SearchForm } from "@/features/search";

import "./SearchWidget.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link SearchWidget}.
 */
interface ISearchWidgetProps {
	/**
	 * Дополнительные классы.
	 */
	classes?: string;
}

/**
 * Компонент виджета поиска.
 *
 * Отображает иконку поиска с возможностью расширения для ввода запроса.
 */
export function SearchWidget({ classes }: ISearchWidgetProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const navigate = useNavigate();

	// Функция выполнения поиска
	const performSearch = (query: string) => {
		if (!query.trim()) return;

		const params = new URLSearchParams();
		params.set("q", query.trim());

		navigate(`/catalog?${params.toString()}`);

		setIsExpanded(false);
		setSearchQuery("");
	};

	// Обработчик клика по иконке поиска
	const handleExpanderClick = () => {
		if (isExpanded && searchQuery.trim()) {
			performSearch(searchQuery);
		} else {
			setIsExpanded(!isExpanded);
		}
	};

	// Обработчик изменения значения поиска
	const handleSearchChange = (value: string) => setSearchQuery(value);

	// Обработчик очистки значения поиска
	const handleSearchClear = () => setSearchQuery("");

	// Обработчик отправки формы
	const handleSearchSubmit = () => performSearch(searchQuery);

	// Обработчик нажатия клавиши на клавиатуре
	const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Escape") {
			setIsExpanded(false);
			setSearchQuery("");
		}
	};

	// Конфигурация формы поиска
	const searchFormConfig: ISearchFormProps = {
		value: searchQuery,
		handlers: {
			onChange: handleSearchChange,
			onClear: handleSearchClear,
			onSubmit: handleSearchSubmit,
			onKeyDown: handleSearchKeyDown,
		},
		config: {
			className: "search-widget__form",
			clearBtnVisible: false,
		},
	};

	// Атрибуты кнопки поиска
	const searchBtnAttrs = {
		"data-id": "search-expander",
		className: classNames("search-widget__btn", classes),
		onClick: handleExpanderClick,
		"aria-label": isExpanded ? "Поиск" : "Открыть поиск",
		"aria-expanded": isExpanded,
		"aria-controls": "search-form",
		title: isExpanded ? "Поиск" : "Открыть поиск",
	}

	return (
		<div
			className={classNames("search-widget", {
				"search-widget--expanded": isExpanded,
			})}
		>
			{isExpanded && (
				<div className="search-widget__form-container">
					<SearchForm {...searchFormConfig} />
				</div>
			)}
			<button type="button" {...searchBtnAttrs}/>
		</div>
	);
}
