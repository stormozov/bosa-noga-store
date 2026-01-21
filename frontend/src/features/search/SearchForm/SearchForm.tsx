import { useCallback } from "react";

import type { ISearchFormProps } from "./types";

import "./SearchForm.scss";

/**
 * Компонент формы поиска товаров.
 */
export function SearchForm({ value, handlers, config = {} }: ISearchFormProps) {
	const { onChange, onClear, onSubmit, onKeyDown } = handlers;
	const {
		className = "",
		id = "search-input",
		name = "search",
		placeholder = "Поиск",
		disabled = false,
		autoComplete = "off",
		clearBtnVisible = true,
	} = config;

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
		[onChange],
	);

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			onSubmit?.();
		},
		[onSubmit],
	);

	const inputProps = {
		type: "search" as const,
		name,
		className: "search-form__input",
		id,
		value,
		placeholder,
		"aria-label": placeholder,
		autoComplete,
		disabled,
		onChange: handleInputChange,
		onKeyDown,
	};

	return (
		<div className={`search-form ${className}`.trim()}>
			<form onSubmit={handleSubmit} className="search-form__form">
				<div className="search-form__input-wrapper">
					<input {...inputProps} />
					{value && clearBtnVisible && (
						<button
							type="button"
							className="search-form__btn-clear"
							aria-label="Очистить поиск"
							title="Очистить поиск"
							onClick={onClear}
							disabled={disabled}
						>
							&times;
						</button>
					)}
				</div>
			</form>
		</div>
	);
}
