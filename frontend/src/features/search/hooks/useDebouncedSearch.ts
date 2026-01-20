import { useCallback, useEffect, useRef, useState } from "react";

import type { ApiParams } from "@/api";

/**
 * Интерфейс, описывающий свойства хука {@link useDebouncedSearch}.
 */
interface IUseDebouncedSearchProps {
	/**
	 * Текущий ID активной категории
	 */
	activeCategoryId: number;

	/**
	 * Функция для сброса состояния пагинации
	 */
	resetItems: () => void;

	/**
	 * Функция для повторной загрузки товаров
	 */
	refetchItems: (
		params?: ApiParams,
		resetPage?: boolean,
		newPage?: number,
	) => Promise<void>;

	/**
	 * Функция для обновления состояния загрузки при смене категории
	 */
	setIsLoadingCategoryChange: (isLoading: boolean) => void;

	/**
	 * Задержка debounce в миллисекундах (по умолчанию 300мс)
	 */
	debounceDelay?: number;
}

/**
 * Хук для управления поиском с debounce и немедленным поиском по Enter
 */
export function useDebouncedSearch({
	activeCategoryId,
	resetItems,
	refetchItems,
	setIsLoadingCategoryChange,
	debounceDelay = 300,
}: IUseDebouncedSearchProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const isMountedRef = useRef(true);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
			if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
		};
	}, []);

	const executeSearch = useCallback(async () => {
		const trimmedQuery = searchQuery.trim();
		const hasCategory = activeCategoryId !== 0;
		const hasQuery = trimmedQuery.length > 0;

		if (!hasCategory && !hasQuery) {
			resetItems();
			setIsLoadingCategoryChange(false);
			return;
		}

		setIsLoadingCategoryChange(true);
		resetItems();

		const params: ApiParams = {};
		if (activeCategoryId !== 0) params.categoryId = activeCategoryId;
		if (hasQuery) params.q = trimmedQuery;

		try {
			await refetchItems(params, true, 0);
		} finally {
			if (isMountedRef.current) {
				setTimeout(() => setIsLoadingCategoryChange(false), 500);
			}
		}
	}, [
		searchQuery,
		activeCategoryId,
		resetItems,
		refetchItems,
		setIsLoadingCategoryChange,
	]);

	const clearSearch = useCallback(() => {
		if (debounceTimeoutRef.current) {
			clearTimeout(debounceTimeoutRef.current);
			debounceTimeoutRef.current = null;
		}

		setSearchQuery("");

		const params: ApiParams = {};
		if (activeCategoryId !== 0) params.categoryId = activeCategoryId;

		setIsLoadingCategoryChange(true);
		resetItems();

		try {
			refetchItems(params, true, 0);
		} finally {
			if (isMountedRef.current) {
				setTimeout(() => setIsLoadingCategoryChange(false), 500);
			}
		}
	}, [activeCategoryId, resetItems, refetchItems, setIsLoadingCategoryChange]);

	const handleSearchQueryChange = useCallback(
		(newQuery: string) => {
			setSearchQuery(newQuery);

			if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

			if (newQuery.trim() === "") {
				clearSearch();
				return;
			}

			debounceTimeoutRef.current = setTimeout(() => {
				if (isMountedRef.current) executeSearch();
			}, debounceDelay);
		},
		[clearSearch, executeSearch, debounceDelay],
	);

	const handleSearchKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				e.preventDefault();

				if (debounceTimeoutRef.current) {
					clearTimeout(debounceTimeoutRef.current);
					debounceTimeoutRef.current = null;
				}

				executeSearch();
			}
		},
		[executeSearch],
	);

	return {
		searchQuery,
		setSearchQuery,
		handleSearchQueryChange,
		handleSearchKeyDown,
		clearSearch,
		executeSearch,
	};
}
