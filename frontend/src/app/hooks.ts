import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { AppDispatch, RootState } from "./types";

/**
 * Хук для получения типизированного диспетчера Redux.
 *
 * Позволяет отправлять действия в хранилище Redux с полной типовой безопасностью.
 * Использует обобщённый тип `AppDispatch`, который определяет допустимые действия
 * для данного приложения.
 *
 * @example
 * ```typescript
 * const dispatch = useAppDispatch();
 * dispatch(someAction(payload));
 * ```
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Типизированный хук для получения данных из хранилища Redux.
 *
 * Предоставляет доступ к состоянию хранилища с полной типовой безопасностью.
 * Использует тип {@link RootState}, который описывает структуру всего состояния 
 * приложения. Это позволяет избежать ошибок при обращении к полям состояния 
 * и гарантирует, что селекторы будут возвращать значения ожидаемого типа.
 *
 * @type {TypedUseSelectorHook<RootState>}
 *
 * @example
 * ```typescript
 * const someData = useAppSelector(state => state.someSlice.someData);
 * ```
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
