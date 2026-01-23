import type { ICartState } from "@/features/cart/types";
import type { store } from "./store";

/**
 * Тип, описывающий корневое состояние хранилища Redux.
 *
 * Представляет собой объект, содержащий все слайсы состояния приложения.
 *
 * @example
 * ```typescript
 * const rootState: RootState = {
 *   cart: {
 *     items: [...],
 *     total: 1500,
 *     // другие поля ICartState
 *   }
 * };
 * ```
 */
export type RootState = {
	cart: ICartState;
};

/**
 * Тип диспетчера Redux-хранилища, полученный на основе метода `dispatch`.
 *
 * Представляет собой типизированную версию функции `dispatch`, которая:
 * - знает все возможные действия (actions), допустимые в приложении;
 * - обеспечивает строгую проверку типов при отправке действий;
 * - гарантирует, что будут переданы только валидные действия.
 * ```
 */
export type AppDispatch = typeof store.dispatch;
