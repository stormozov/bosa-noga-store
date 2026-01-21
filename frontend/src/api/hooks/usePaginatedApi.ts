import { useCallback, useEffect, useRef, useState } from "react";
import { get } from "../core";
import type {
	ApiParams,
	IPaginatedApiParams,
	IPaginatedApiResult,
} from "../types";

const DEBUG = import.meta.env.MODE === "development";

/**
 * Кастомный хук для работы с постраничным API.
 *
 * Позволяет загружать данные постранично с поддержкой фильтрации, подгрузки
 * и отмены запросов. Управляет состоянием: начальная загрузка, подгрузка,
 * ошибка, наличие следующей страницы и т.д.
 *
 * @template T - Тип элементов, возвращаемых API (например, `Product`, `User`
 * и т.д.).
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

				if (DEBUG) console.log(`Main fetch: ${url}`);

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

				let nextHasMore = false;

				if (result.length < itemsPerPage) {
					nextHasMore = false;
				} else if (result.length === itemsPerPage) {
					const nextOffset = requestOffset + itemsPerPage;

					const checkParams = new URLSearchParams(urlParams);
					checkParams.set("offset", nextOffset.toString());
					const checkUrl = `${baseUrl}?${checkParams.toString()}`;

					if (DEBUG) console.log(`Pagination check: ${checkUrl}`);

					try {
						const checkResult = await get<T[]>(checkUrl, {
							...options,
							signal: controller.signal,
						});

						nextHasMore = checkResult.length > 0;
					} catch (checkError) {
						if (
							DEBUG &&
							checkError instanceof Error &&
							checkError.name !== "AbortError"
						) {
							console.warn(
								"Pagination check failed, assuming no more pages",
								checkError,
							);
						}
						nextHasMore = false;
					}
				} else {
					nextHasMore = true;
				}

				setHasMore(nextHasMore);
				return result;
			} catch (err) {
				if (err instanceof Error && err.name === "AbortError") return;

				if (isMounted.current) {
					setError(
						err instanceof Error ? err : new Error("Ошибка загрузки данных"),
					);

					if (isInitial) setData([]);
				}

				return [];
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
		if (Object.keys(initialParams).length > 0) {
			paramsRef.current = initialParams;
			fetchData(initialParams, true, false, 0);
		} else {
			setLoadingInitial(false);
		}

		return () => {
			isMounted.current = false;
			abortRequest();
		};
	}, [initialParams, fetchData, abortRequest]);

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
