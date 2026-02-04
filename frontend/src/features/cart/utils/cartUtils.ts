import type { WritableDraft } from "@reduxjs/toolkit";
import type { ICalculateTotalsUtils, ICartItem, ICartState } from "../types";

/**
 * Пересчитывает итоговые значения для корзины на основе списка товаров.
 *
 * Вычисляет:
 * - общую сумму (`totalAmount`) — сумму полей `total` всех элементов;
 * - общее количество товаров (`totalCount`) — сумму полей `count` всех элементов.
 *
 * @example
 * ```typescript
 * const items: ICartItem[] = [
 *   { id: 1, count: 2, total: 400 },
 *   { id: 2, count: 1, total: 300 }
 * ];
 * const totals = calculateTotals(items);
 * console.log("Итого:", totals); // { totalAmount: 700, totalCount: 3 }
 * ```
 */
export const calculateTotals = (items: ICartItem[]): ICalculateTotalsUtils => {
	const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
	const totalCount = items.reduce((sum, item) => sum + item.count, 0);
	return { totalAmount, totalCount };
};

/**
 * Обновляет состояние корзины на основе списка товаров.
 */
export const handleRehydrate = (
	state: WritableDraft<ICartState>,
	items: ICartItem[],
) => {
	const { totalAmount, totalCount } = calculateTotals(items);

	state.items = items;
	state.totalAmount = totalAmount;
	state.totalCount = totalCount;
};
