import { useCallback, useEffect, useRef, useState } from "react";
import { get } from "../core";
import type {
	ApiParams,
	IPaginatedApiParams,
	IPaginatedApiResult
} from "../types";

/**
 * Кастомный хук для работы с постраничным API.
 *
 * Позволяет загружать данные постранично с поддержкой фильтрации, подгрузки
 * и отмены запросов. Управляет состоянием: начальная загрузка, подгрузка,
 * ошибка, наличие следующей страницы и т.д.
 *
 * @template T - Тип элементов, возвращаемых API (например, `Product`, `User`
 * и т.д.).
 *
 * @remarks
 * - Использует `AbortController` для отмены предыдущего запроса при новом вызове.
 * - Поддерживает динамическое обновление параметров через `refetch`.
 * - Параметр `offset` автоматически увеличивается при подгрузке.
 * - Состояние `hasMore` определяется по количеству возвращённых элементов.
 * - В режиме разработки выводит URL запроса в консоль.
 * - Хук корректно очищает ресурсы при размонтировании.
 */
export const usePaginatedApi = <T>(
	config: IPaginatedApiParams,
): IPaginatedApiResult<T> => {
	const {
		baseUrl,
		params: initialParams = {},
		itemsPerPage = 6,
		options,
	} = config;

	const [data, setData] = useState<T[]>([]);
	const [loadingInitial, setLoadingInitial] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);

	const paramsRef = useRef<ApiParams>(initialParams);
	const abortControllerRef = useRef<AbortController | null>(null);
	const isMounted = useRef(true);

	/**
	 * Функция для отмены существующего запроса.
	 */
	const abortRequest = useCallback(() => {
		if (!abortControllerRef.current) return;
		abortControllerRef.current.abort();
		abortControllerRef.current = null;
	}, []);

	/**
	 * Функция для выполнения HTTP-запроса с управлением состояния.
	 */
	const fetchData = useCallback(
		async (
			newParams: ApiParams = {},
			isInitial = true,
			append = false,
			requestOffset: number = 0,
		) => {
			abortRequest();
			const controller = new AbortController();
			abortControllerRef.current = controller;

			const loadingSetter = isInitial ? setLoadingInitial : setLoadingMore;
			loadingSetter(true);
			setError(null);

			try {
				const mergedParams = { ...paramsRef.current, ...newParams };
				if (isInitial) paramsRef.current = mergedParams;

				const urlParams = new URLSearchParams();
				Object.entries(mergedParams).forEach(([key, value]) => {
					if (value !== undefined && value !== null && key !== "offset") {
						urlParams.append(key, String(value));
					}
				});

				if (!isInitial && append && requestOffset > 0) {
					urlParams.append("offset", requestOffset.toString());
				}

				const queryString = urlParams.toString();
				const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				import.meta.env.MODE === "development" &&
					console.log(`Fetching URL: ${url} with offset: ${requestOffset}`);

				const result = await get<T[]>(url, {
					...options,
					signal: controller.signal,
				});

				if (!isMounted.current) return;

				if (isInitial) {
					setData(result);
					setOffset(0);
				} else if (append) {
					setData((prev) => [...prev, ...result]);
					setOffset(requestOffset);
				}

				setHasMore(result.length >= itemsPerPage);
				return result;
			} catch (err) {
				const isError = err instanceof Error;
				if (isError && err.name === "AbortError") return;

				if (isMounted.current) {
					setError(isError ? err : new Error("Ошибка загрузки данных"));
					if (isInitial) setData([]);
				}

				throw err;
			} finally {
				if (isMounted.current) loadingSetter(false);
			}
		},
		[baseUrl, itemsPerPage, options, abortRequest],
	);

	const refetch = useCallback(
		async (newParams: ApiParams = {}, isInitial = true, initialOffset = 0) => {
			await fetchData(newParams, isInitial, false, initialOffset);
		},
		[fetchData],
	);

	const loadMore = useCallback(
		async (newParams: ApiParams = {}) => {
			if (!hasMore || loadingMore) return;
			const nextOffset = offset + itemsPerPage;
			await fetchData(newParams, false, true, nextOffset);
		},
		[fetchData, hasMore, loadingMore, offset, itemsPerPage],
	);

	const reset = useCallback(() => {
		abortRequest();
		setData([]);
		setOffset(0);
		setHasMore(true);
		setError(null);
		paramsRef.current = initialParams;
	}, [abortRequest, initialParams]);

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
			abortRequest();
		};
	}, [abortRequest]);

	useEffect(() => {
		if (Object.keys(initialParams).length > 0) {
			paramsRef.current = initialParams;
			fetchData(initialParams, true, false, 0);
		}

		setLoadingInitial(false);
	}, [initialParams, fetchData]);

	return {
		state: {
			data,
			loadingInitial,
			loadingMore,
			error,
			hasMore,
			offset,
		},
		actions: {
			refetch,
			loadMore,
			reset,
		},
	};
};
