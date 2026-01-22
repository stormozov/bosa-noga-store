import "./ProductCountSelector.scss";

/**
 * Интерфейс свойств для компонента селектора количества товара.
 *
 * @interface IProductCountSelectorProps
 */
interface IProductCountSelectorProps {
	/**
	 * Текущее количество товара в корзине/заказе.
	 *
	 * Должно быть положительным числом (≥ 1).
	 */
	currentCount: number;

	/**
	 * Обработчик изменения количества товара.
	 *
	 * Вызывается при увеличении или уменьшении количества.
	 * Получает новое значение количества и должен обновить состояние компонента.
	 *
	 * @param {number} newCount - Новое количество товара (должно быть ≥ 1).
	 *
	 * @example
	 * ```ts
	 * const handleCountChange = (newCount: number) => {
	 *   setProductCount(newCount);
	 * };
	 * ```
	 */
	handleCountChange: (newCount: number) => void;
}

/**
 * Компонент селектора количества товара.
 *
 * Позволяет пользователю изменять количество товара с помощью:
 * - кнопок «‑» и «+» для пошагового изменения;
 * - прямого ввода числа в поле.
 *
 * Гарантирует, что количество не опустится ниже минимального значения (1).
 *
 * @example
 * ```tsx
 * <ProductCountSelector
 *   currentCount={3}
 *   handleCountChange={(count) => setCount(count)}
 * />
 * ```
 */
export function ProductCountSelector({
	currentCount,
	handleCountChange,
}: IProductCountSelectorProps) {
	// Константы
	const MIN_COUNT = 1;
	const STEP = 1;
	const IS_AT_MOST_ONE = currentCount <= 1;

	// Вычисление ширины поля ввода на основе количества цифр
	const digitCount = currentCount.toString().length;
	const widthInCh = Math.max(2, digitCount + 3);

	// Обработчики
	const handleIncrement = () => handleCountChange(currentCount + STEP);
	const handleDecrement = () => handleCountChange(currentCount - STEP);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (value === "") return;
		const num = Number(value);
		if (!Number.isNaN(num) && num >= MIN_COUNT) handleCountChange(num);
	};

	const handleInputBlur = () => {
		if (currentCount < MIN_COUNT) handleCountChange(1);
	};

	return (
		<div className="product-count-selector">
			<div className="btn-group">
				<button
					type="button"
					className="product-count-selector__btn btn btn-secondary"
					arial-label="Уменьшить количество товара"
					title={IS_AT_MOST_ONE ? "Минимум 1" : "Уменьшить количество товара"}
					onClick={handleDecrement}
					disabled={IS_AT_MOST_ONE}
				>
					-
				</button>

				<input
					type="text"
					name="count"
					className="product-count-selector__count"
					value={currentCount}
					arial-label="Поле ввода количества товара"
					style={{ width: `${widthInCh}ch` }}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
				/>

				<button
					type="button"
					className="product-count-selector__btn btn btn-secondary"
					arial-label="Увеличить количество товара"
					title="Увеличить количество товара"
					onClick={handleIncrement}
				>
					+
				</button>
			</div>
		</div>
	);
}
