import { useCallback, useEffect, useRef, useState } from "react";
import { post } from "../core";
import type { IApiOptions, IUsePostReturns } from "../types";

/**
 * Хук для выполнения HTTP POST-запросов с управлением состоянием.
 *
 * @template T - Тип данных, ожидаемых в ответе от сервера.
 *
 * @returns Объект с состоянием запроса и функцией `execute` для его выполнения.
 * Объект описан в {@link IUsePostReturns}.
 *
 * @example
 * const { data, loading, error, execute } = useApiPost<UserResponse>();
 *
 * const handleSend = async () => {
 *   try {
 *     await execute('/api/users', { name: 'Иван' });
 *   } catch (err) {
 *     console.error('Ошибка при создании пользователя:', err);
 *   }
 * };
 */
export const useApiPost = <T>(): IUsePostReturns<T> => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const isMounted = useRef(true);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	const execute = useCallback(
		async (url: string, body: unknown, options?: IApiOptions): Promise<T> => {
			if (!isMounted.current) {
				throw new Error("Компонент отключен во время запроса");
			}

			setLoading(true);
			setError(null);

			try {
				const result = await post<T>(url, body, options);

				if (isMounted.current) {
					setData(result);
					setError(null);
					return result;
				}

				return result;
			} catch (err) {
				const errorObj =
					err instanceof Error ? err : new Error("Запрос не удался.");

				if (isMounted.current) setError(errorObj);

				throw errorObj;
			} finally {
				if (isMounted.current) setLoading(false);
			}
		},
		[],
	);

	return { data, loading, error, execute };
};
