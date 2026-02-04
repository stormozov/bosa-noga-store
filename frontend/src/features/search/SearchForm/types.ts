/**
 * Интерфейс для обработчиков событий формы поиска
 */
export interface ISearchFormHandlers {
	onChange: (value: string) => void;
	onClear: () => void;
	onSubmit?: () => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Интерфейс для конфигурации формы поиска
 */
export interface ISearchFormConfig {
	placeholder?: string;
	disabled?: boolean;
	autoComplete?: string;
	className?: string;
	id?: string;
	name?: string;
	clearBtnVisible?: boolean;
}

/**
 * Интерфейс, описывающий свойства компонента {@link SearchForm}
 */
export interface ISearchFormProps {
  value: string;
  handlers: ISearchFormHandlers;
  config?: ISearchFormConfig;
}
