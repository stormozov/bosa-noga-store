import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";

import { type ISearchFormProps, SearchForm } from "@/features/search";
import { useNavigateWithScrollReset } from "@/shared/hooks";

import "./SearchWidget.scss";

interface ISearchWidgetProps {
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

	const widgetRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigateWithScrollReset();

	// ФУНКЦИИ И ОБРАБОТЧИКИ
	const collapseWidget = useCallback(() => {
		setIsExpanded(false);
		setSearchQuery("");
	}, []);

	const performSearch = useCallback(
		(query: string) => {
			if (!query.trim()) return;

			const params = new URLSearchParams();
			params.set("q", query.trim());

			navigate(`/catalog?${params.toString()}`);

			collapseWidget();
		},
		[collapseWidget, navigate],
	);

	const handleExpanderClick = useCallback(() => {
		if (isExpanded && searchQuery.trim()) {
			performSearch(searchQuery);
		} else {
			setIsExpanded(!isExpanded);
		}
	}, [isExpanded, performSearch, searchQuery]);

	const handleClickOutside = useCallback(
		(event: MouseEvent | TouchEvent) => {
			if (
				widgetRef.current &&
				event.target instanceof Node &&
				!widgetRef.current.contains(event.target)
			) {
				collapseWidget();
			}
		},
		[collapseWidget],
	);

	const handleSearchChange = useCallback(
		(value: string) => setSearchQuery(value),
		[],
	);

	const handleSearchClear = useCallback(() => setSearchQuery(""), []);

	const handleSearchSubmit = useCallback(
		() => performSearch(searchQuery),
		[performSearch, searchQuery],
	);

	const handleSearchKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Escape") collapseWidget();
		},
		[collapseWidget],
	);

	// ЭФФЕКТЫ
	useEffect(() => {
		if (!isExpanded) return;

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [handleClickOutside, isExpanded]);

	// КОНФИГИ И АТРИБУТЫ
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

	const searchBtnAttrs = {
		className: classNames("search-widget__btn", classes),
		"data-id": "search-expander",
		"aria-label": isExpanded ? "Поиск" : "Открыть поиск",
		"aria-expanded": isExpanded,
		"aria-controls": "search-form",
		title: isExpanded ? "Поиск" : "Открыть поиск",
		onClick: handleExpanderClick,
	};

	return (
		<div
			className={classNames("search-widget", {
				"search-widget--expanded": isExpanded,
			})}
			ref={widgetRef}
		>
			{isExpanded && (
				<div className="search-widget__form-container">
					<SearchForm {...searchFormConfig} />
				</div>
			)}
			<button type="button" {...searchBtnAttrs} />
		</div>
	);
}
