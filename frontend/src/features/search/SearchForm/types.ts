/**
 * Интерфейс для обработчиков событий формы поиска
 */
export interface ISearchFormHandlers {
	/**
	 * Обработчик изменения значения в поле поиска
	 */
	onChange: (value: string) => void;

	/**
	 * Обработчик очистки поиска
	 */
	onClear: () => void;

	/**
	 * Обработчик отправки формы (опционально)
	 */
	onSubmit?: () => void;

	/**
	 * Обработчик нажатия клавиш (опционально)
	 */
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Интерфейс для конфигурации формы поиска
 */
export interface ISearchFormConfig {
	/**
	 * Placeholder для поля ввода
	 */
	placeholder?: string;

	/**
	 * Флаг отключения поля ввода
	 */
	disabled?: boolean;

	/**
	 * Настройка авто заполнения браузера
	 */
	autoComplete?: string;

	/**
	 * Дополнительный CSS класс
	 */
	className?: string;

	/**
	 * ID для тестирования или доступности
	 */
	id?: string;

	/**
	 * Имя поля для формы
	 */
	name?: string;
}

/**
 * Интерфейс, описывающий свойства компонента {@link SearchForm}
 */
export interface ISearchFormProps {
  /**
   * Текущее значение поискового запроса
   */
  value: string;

  /**
   * Обработчики событий формы
   * 
   * @see {@link ISearchFormHandlers}
   */
  handlers: ISearchFormHandlers;

  /**
   * Конфигурация компонента
   * 
   * @see {@link ISearchFormConfig}
   */
  config?: ISearchFormConfig;
}
