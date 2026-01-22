import classNames from "classnames";
import { memo } from "react";

import type { IProductSize } from "@/features/product/types";

import "./ProductSizeBtn.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link ProductSizeBtn}.
 */
interface IProductSizeBtnProps {
	/**
	 * Размер товара и его доступность.
	 * 
	 * @see {@link IProductSize}
	 */
	sizeItem: IProductSize;

	/**
	 * Флаг, указывающий на выбранный размер.
	 */
	isActive: boolean;

	/**
	 * Обработчик события клика по размеру.
	 *
	 * @param {string} size - Обозначение выбранного размера.
	 *
	 * @example
	 * ```ts
	 * const handleSizeClick = (size: string) => {
	 *   console.log(`Выбран размер: ${size}`);
	 * };
	 * ```
	 */
	onClick: (size: string) => void;
}

/**
 * Компонент кнопки размера товара.
 */
export const ProductSizeBtn = memo(
	({ sizeItem, isActive, onClick }: IProductSizeBtnProps) => {
		const titleText = !sizeItem.available
			? "Нет в наличии"
			: isActive
				? `Выбран размер: ${sizeItem.size}`
				: "В наличии";

		return (
			<button
				type="button"
				className={classNames("product-size-btn", { selected: isActive })}
				title={titleText}
				aria-pressed={isActive}
				onClick={() => onClick(sizeItem.size)}
				disabled={!sizeItem.available || isActive}
			>
				{sizeItem.size}
			</button>
		);
	},
);
