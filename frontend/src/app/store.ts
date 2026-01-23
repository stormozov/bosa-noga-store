import { configureStore } from "@reduxjs/toolkit";

import { cartLogger, cartReducer } from "@/features/cart";

/**
 * Экземпляр хранилища Redux для приложения.
 *
 * Обеспечивает централизованное управление состоянием приложения
 * с оптимизированной производительностью и встроенными механизмами отладки.
 *
 * @example
 * ```typescript
 * // Получение состояния
 * const state = store.getState();
 *
 * // Отправка действия
 * store.dispatch(addToCart({ id: 1, quantity: 2 }));
 *
 * // Подписка на изменения состояния
 * store.subscribe(() => console.log('Состояние изменилось:', store.getState()));
 * ```
 */
export const store = configureStore({
	reducer: {
		cart: cartReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["cart/addItem"],
				ignoredPaths: ["meta.arg", "payload.timestamp"],
			},
		}).concat(cartLogger),
});
