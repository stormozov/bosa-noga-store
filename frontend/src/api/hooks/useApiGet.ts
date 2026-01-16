import { useCallback, useEffect, useRef, useState } from "react";
import { get } from "../core";
import type { IApiOptions, IUseGetReturns } from "../types";

/**
 * Хук для выполнения GET-запросов к API с управлением состоянием.
 *
 * @description
 * Предоставляет данные, флаг загрузки, возможную ошибку и функцию для
 * повторного запроса. Гарантирует отсутствие утечек памяти, отменяя обновление
 * состояния, если компонент был размонтирован (через `useRef`-флаг `isMounted`).
 *
 * @template T - Тип данных, ожидаемых в ответе от API. Используется для
 * типизации `data`.
 *
 * @param {string | null} url - URL API-эндпоинта для GET-запроса. Если `null`,
 * запрос не выполняется.
 * @param {IApiOptions} [options] - Дополнительные параметры запроса: заголовки,
 * таймаут и др.
 *
 * @returns {IUseGetReturns<T>} Объект с полями, описанными
 * в {@link IUseGetReturns}.
 *
 * @example
 * const { data, loading, error, refetch } = useApiGet<User[]>("/api/users");
 *
 * if (loading) return <ContentPreloader />;
 * if (error) return <ErrorMessage message={error.message} />;
 *
 * return <UserList users={data} onRefresh={refetch} />;
 */
export const useApiGet = <T>(
	url: string | null,
	options?: IApiOptions,
): IUseGetReturns<T> => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const isMounted = useRef(true);

	const fetchData = useCallback(async () => {
		if (!url) {
			setLoading(false);
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const result = await get<T>(url, options);
			if (isMounted.current) {
				setData(result);
				setError(null);
			}
		} catch (err) {
			if (isMounted.current) {
				setError(err instanceof Error ? err : new Error("Неизвестная ошибка"));
			}
		} finally {
			if (isMounted.current) setLoading(false);
		}
	}, [url, options]);

	useEffect(() => {
		isMounted.current = true;
		fetchData();

		return () => {
			isMounted.current = false;
		};
	}, [fetchData]);

	return { data, loading, error, refetch: fetchData };
};
