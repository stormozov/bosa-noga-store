import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

import { type ApiParams, useApiGet } from "@/api";
import { usePaginatedApi } from "@/api/hooks/usePaginatedApi";
import { ContentPreloader } from "@/features/Preloader";
import type { ICatalogCategory, ProductCardType } from "@/features/product";
import {
	AnimatedProductList,
	CatalogCategories,
	CatalogCategoriesSkeleton,
} from "@/features/product";
import { type ISearchFormProps, SearchForm } from "@/features/search";
import { LoadMoreButton } from "@/shared/ui";
import { CATEGORIES_API, ITEMS_API } from "./constants";

import "./CatalogSection.scss";

/**
 * Интерфейс для рефа с функцией загрузки и контроллером
 */
interface ILoadItemsRef {
	/**
	 * Контроллер запроса
	 */
	abortController: AbortController | null;

	/**
	 * Функция загрузки
	 */
	loadFn: (categoryId: number, query: string) => Promise<void>;
}

/**
 * Интерфейс, определяющий конфигурацию видимости элементов в секции каталога.
 *
 * Позволяет управлять отображением отдельных компонентов интерфейса.
 */
interface ICatalogSectionVisibilityConfig {
	/**
	 * Флаг, указывающий, должна ли быть видна навигация по категориям.
	 */
	isCategoryVisible?: boolean;

	/**
	 * Флаг, указывающий, должна ли быть видна кнопка "Загрузить ещё".
	 */
	isButtonMoreVisible?: boolean;

	/**
	 * Флаг, указывающий, должна ли быть видна форма поиска товаров.
	 */
	isSearchVisible?: boolean;
}

/**
 * Интерфейс, описывающий свойства компонента {@link CatalogSection}.
 */
interface ICatalogSectionProps {
	/**
	 * Конфигурация видимости элементов интерфейса каталога.
	 *
	 * @see {@link ICatalogSectionVisibilityConfig}
	 */
	visibility?: ICatalogSectionVisibilityConfig;
}

/**
 * Компонент секции каталога товаров с фильтрацией по категориям.
 */
export function CatalogSection({ visibility }: ICatalogSectionProps) {
	// Состояния
	const [activeCategoryId, setActiveCategoryId] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();
	const [localSearchQuery, setLocalSearchQuery] = useState("");
	const [isLoadingCategoryChange, setIsLoadingCategoryChange] = useState(false);

	// Рефы
	const isMountedRef = useRef(true);
	const loadItemsRef = useRef<ILoadItemsRef>({
		abortController: null,
		loadFn: async () => Promise.resolve(),
	});
	const activeCategoryIdRef = useRef(activeCategoryId);

	// Синхронизация рефа с текущим значением activeCategoryId
	useEffect(() => {
		activeCategoryIdRef.current = activeCategoryId;
	}, [activeCategoryId]);

	// Конфигурация видимости элементов
	const {
		isCategoryVisible = true,
		isButtonMoreVisible = true,
		isSearchVisible = true,
	} = visibility || {};

	// Загрузка товаров по API
	const {
		state: {
			data: items,
			loadingInitial,
			loadingMore,
			error: itemsError,
			hasMore,
		},
		actions: {
			refetch: refetchItems,
			loadMore: loadMoreItems,
			reset: resetItems,
		},
	} = usePaginatedApi<ProductCardType>({ baseUrl: ITEMS_API });

	// Загрузка категорий
	const { data: categories = [], loading: categoriesLoading } =
		useApiGet<ICatalogCategory[]>(CATEGORIES_API);

	// URL-параметр поиска
	const urlSearchQuery = searchParams.get("q")?.trim() || "";

	// Синхронизация локального состояния с URL при mount и изменении URL
	useEffect(() => setLocalSearchQuery(urlSearchQuery), [urlSearchQuery]);

	// Функция для отмены существующего запроса
	const abortExistingRequest = useCallback(() => {
		if (!loadItemsRef.current.abortController) return;
		loadItemsRef.current.abortController.abort();
		loadItemsRef.current.abortController = null;
	}, []);

	// Основная функция загрузки товаров
	const loadItems = useCallback(
		async (categoryId: number, query: string) => {
			abortExistingRequest();

			if (!isMountedRef.current) return;

			const controller = new AbortController();
			loadItemsRef.current.abortController = controller;

			// Устанавливаем флаг загрузки при смене категории
			if (categoryId !== activeCategoryIdRef.current) {
				setIsLoadingCategoryChange(true);
			}

			resetItems();

			try {
				const params: ApiParams = {};
				if (categoryId !== 0) params.categoryId = categoryId;
				if (query) params.q = query;

				await refetchItems(params, true, 0);
			} catch (error) {
				if (
					error instanceof Error &&
					error.name !== "AbortError" &&
					isMountedRef.current
				) {
					console.error("Failed to load items:", error);
				}
			} finally {
				if (
					isMountedRef.current &&
					categoryId !== activeCategoryIdRef.current
				) {
					setIsLoadingCategoryChange(false);
				}
				if (loadItemsRef.current.abortController === controller) {
					loadItemsRef.current.abortController = null;
				}
			}
		},
		[abortExistingRequest, resetItems, refetchItems],
	);

	// Обновление рефа с актуальной версией функции
	useEffect(() => {
		loadItemsRef.current.loadFn = loadItems;
	}, [loadItems]);

	// Загрузка данных при изменении активной категории или поискового запроса из URL
	useEffect(() => {
		if (!isMountedRef.current) return;
		loadItemsRef.current.loadFn(activeCategoryId, urlSearchQuery);
	}, [activeCategoryId, urlSearchQuery]);

	// Обработчик очистки поиска
	const handleClearSearch = useCallback(() => {
		setLocalSearchQuery("");
		const newParams = new URLSearchParams(searchParams);
		newParams.delete("q");
		setSearchParams(newParams, { replace: true });
	}, [searchParams, setSearchParams]);

	// Обработчик выбора категории
	const handleCategorySelect = useCallback((categoryId: number) => {
		setActiveCategoryId(categoryId);
	}, []);

	// Обработчик подгрузки новой порции товаров
	const handleLoadMore = useCallback(() => {
		if (!hasMore || loadingMore || isLoadingCategoryChange) return;

		const params: ApiParams = {};
		if (activeCategoryId !== 0) params.categoryId = activeCategoryId;
		if (urlSearchQuery) params.q = urlSearchQuery;

		loadMoreItems(params);
	}, [
		hasMore,
		loadingMore,
		isLoadingCategoryChange,
		activeCategoryId,
		urlSearchQuery,
		loadMoreItems,
	]);

	// Обработчик формы поиска
	const handleSearchChange = useCallback((value: string) => {
		setLocalSearchQuery(value);
	}, []);

	// Обработчик отправки формы
	const handleSearchSubmit = useCallback(() => {
		const trimmedQuery = localSearchQuery.trim();

		// Если запрос не изменился, не нужно обновлять URL
		if (trimmedQuery === urlSearchQuery) return;

		const newParams = new URLSearchParams(searchParams);
		if (trimmedQuery) {
			newParams.set("q", trimmedQuery);
		} else {
			newParams.delete("q");
		}

		setSearchParams(newParams);
	}, [localSearchQuery, urlSearchQuery, searchParams, setSearchParams]);

	// Обработчик нажатия клавиши во время ввода
	const handleSearchKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Escape") {
				handleClearSearch();
			} else if (e.key === "Enter") {
				handleSearchSubmit();
			}
		},
		[handleClearSearch, handleSearchSubmit],
	);

	// Условие для отображения кнопки "Загрузить еще"
	const shouldShowLoadMore =
		isButtonMoreVisible &&
		hasMore &&
		items.length > 0 &&
		!loadingInitial &&
		!isLoadingCategoryChange;
	
	// Условие для отображения блока "Ничего не найдено"
	const shouldShowNotFound =
		!loadingInitial &&
		!isLoadingCategoryChange &&
		!itemsError &&
		items.length === 0;

	// Условие для отображения блока "Загрузка..."
	const shouldShowLoading = loadingInitial || isLoadingCategoryChange;

	// Конфигурация для формы поиска
	const searchFormConfig: ISearchFormProps = {
		value: localSearchQuery,
		handlers: {
			onChange: handleSearchChange,
			onClear: handleClearSearch,
			onSubmit: handleSearchSubmit,
			onKeyDown: handleSearchKeyDown,
		},
	};

	// Конфигурация для кнопки "Загрузить еще"
	const loadMoreConfig = {
		isLoading: loadingMore,
		hasMore: hasMore,
		disabled:
			!hasMore || loadingMore || isLoadingCategoryChange || loadingInitial,
		onClick: handleLoadMore,
	};

	// Очистка при размонтировании
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
			abortExistingRequest();
		};
	}, [abortExistingRequest]);

	return (
		<section className="catalog-section min-height-300 pt-4rem pb-2rem">
			<h2 className="text-center">Каталог</h2>

			{isSearchVisible && (
				<div className="catalog-section__search mb-2rem">
					<SearchForm {...searchFormConfig} />
				</div>
			)}

			<div className="catalog-section__categories">
				{isCategoryVisible && categoriesLoading && (
					<CatalogCategoriesSkeleton count={5} />
				)}
				{isCategoryVisible && !categoriesLoading && categories && (
					<CatalogCategories
						categories={categories}
						activeCategoryId={activeCategoryId}
						onCategorySelect={handleCategorySelect}
					/>
				)}
			</div>

			<div className="catalog-section__items">
				{shouldShowLoading && <ContentPreloader />}

				{!loadingInitial && !isLoadingCategoryChange && itemsError && (
					<div className="catalog-section__error">
						<p className="text-center color-error">{itemsError.message}</p>
						<button
							type="button"
							className="btn btn-ghost mt-1rem"
							onClick={() =>
								loadItemsRef.current.loadFn(activeCategoryId, urlSearchQuery)
							}
							disabled={shouldShowLoading}
						>
							{shouldShowLoading ? "Загрузка..." : "Попробовать снова"}
						</button>
					</div>
				)}

				{shouldShowNotFound && (
					<div className="catalog-section__empty text-center">
						<p>Товары не найдены</p>
						{urlSearchQuery && (
							<button
								type="button"
								className="btn btn-ghost mt-1rem"
								onClick={handleClearSearch}
							>
								Очистить поиск
							</button>
						)}
					</div>
				)}

				{items.length > 0 && !loadingInitial && !isLoadingCategoryChange && (
					<AnimatedProductList products={items} />
				)}

				{shouldShowLoadMore && (
					<div className="catalog-section__load-more mt-1rem text-center">
						<LoadMoreButton
							config={loadMoreConfig}
							className="catalog-section__load-more"
						/>
					</div>
				)}
			</div>
		</section>
	);
}
