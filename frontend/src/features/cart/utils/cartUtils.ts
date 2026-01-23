import type { ICalculateTotalsUtils, ICartItem } from "../types";

const DEBUG = import.meta.env.MODE === "development";
const CART_STORAGE_KEY = "cart";

/**
 * Загружает содержимое корзины из localStorage при инициализации приложения.
 *
 * @returns {ICartItem[]} Массив элементов корзины ({@link ICartItem})
 * из localStorage или пустой массив при ошибке/отсутствии данных.
 *
 * @throws {Error} Ловит и обрабатывает ошибки чтения из localStorage (например,
 * при переполнении или нарушении политики безопасности), выводит сообщение
 * в консоль (если `DEBUG === true`).
 *
 * @example
 * ```typescript
 * const cartItems = loadCartFromStorage();
 * console.log("Загруженная корзина:", cartItems);
 * ```
 */
export const loadCartFromStorage = (): ICartItem[] => {
	try {
		const savedCart = localStorage.getItem(CART_STORAGE_KEY);
		return savedCart ? JSON.parse(savedCart) : [];
	} catch (error) {
		if (DEBUG) console.error("Error loading cart from localStorage:", error);
		return [];
	}
};

/**
 * Пересчитывает итоговые значения для корзины на основе списка товаров.
 *
 * Вычисляет:
 * - общую сумму (`totalAmount`) — сумму полей `total` всех элементов;
 * - общее количество товаров (`totalCount`) — сумму полей `count` всех элементов.
 *
 * @param {ICartItem[]} items - Массив элементов корзины, для которых нужно
 * посчитать итоги.
 *
 * @returns {ICalculateTotalsUtils} Объект с двумя полями:
 *   - `totalAmount` — общая сумма всех товаров;
 *   - `totalCount` — общее количество единиц товаров.
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
 * Сохраняет текущее состояние корзины в localStorage.
 *
 * Сериализует массив элементов корзины в JSON и записывает его в localStorage
 * по ключу `CART_STORAGE_KEY`. В случае ошибки (например, переполнения
 * хранилища или нарушения политики безопасности) выводит сообщение в консоль
 * (если `DEBUG === true`).
 *
 * @param {ICartItem[]} items - Массив элементов корзины, который нужно сохранить.
 *
 * @throws {Error} Ловит и обрабатывает ошибки записи в localStorage, выводит
 * сообщение в консоль при активации режима отладки (`DEBUG === true`).
 *
 * @example
 * ```typescript
 * const cartItems: ICartItem[] = [
 *   { id: 1, count: 2, total: 400 }
 * ];
 * saveCartToStorage(cartItems);
 * console.log("Корзина сохранена в localStorage");
 * ```
 */
export const saveCartToStorage = (items: ICartItem[]) => {
	try {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
	} catch (error) {
		if (DEBUG) console.error("Error saving cart to localStorage:", error);
	}
};

/**
 * Очищает корзину в localStorage.
 *
 * Удаляет ключ `CART_STORAGE_KEY` из localStorage. В случае ошибки (например,
 * нарушения политики безопасности) выводит сообщение в консоль (если
 * `DEBUG === true`).
 *
 * @throws {Error} Ловит и обрабатывает ошибки очистки localStorage, выводит
 * сообщение в консоль при активации режима отладки (`DEBUG === true`).
 */
export const clearCartFromStorage = () => {
	try {
		localStorage.removeItem(CART_STORAGE_KEY);
	} catch (error) {
		if (DEBUG) console.error("Error clearing cart from localStorage:", error);
	}
};
