import { useCallback } from "react";

import "./SearchForm.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link SearchForm}.
 */
interface ISearchFormProps {
	/**
	 * Текущее значение поискового запроса.
	 */
	query: string;

	/**
	 * Функция-обработчик изменения поискового запроса.
	 */
	onChange: (query: string) => void;

	/**
	 * Функция-обработчик выполнения поиска.
	 */
	onSearch: () => void;

	/**
	 * Функция-обработчик очистки поиска.
	 */
	onClearSearch: () => void;
}

/**
 * Компонент формы поиска товаров.
 */
export function SearchForm({
	query,
	onChange,
	onSearch,
	onClearSearch,
}: ISearchFormProps) {
	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
		[onChange],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") onSearch();
		},
		[onSearch],
	);

	return (
		<div className="search-form">
			<div className="search-form__input-wrapper">
				<input
					type="search"
					name="search"
					className="search-form__input"
					value={query}
					placeholder="Поиск"
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
				/>
				{query && (
					<button
						type="button"
						className="search-form__btn-clear"
						aria-label="Очистить поиск"
						title="Очистить поиск"
						onClick={onClearSearch}
					>
						&times;
					</button>
				)}
			</div>
		</div>
	);
}
