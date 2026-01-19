import { useCallback, useEffect, useRef, useState } from "react";

import { type ApiParams, useApiGet } from "@/api";
import { usePaginatedApi } from "@/api/hooks/usePaginatedApi";
import { ContentPreloader } from "@/features/Preloader";
import type { ICatalogCategory, ProductCardType } from "@/features/product";
import {
	AnimatedProductList,
	CatalogCategories,
	CatalogCategoriesSkeleton,
} from "@/features/product";
import { LoadMoreButton } from "@/shared/ui";
import { CATEGORIES_API, ITEMS_API } from "./constants";

import "./CatalogSection.scss";

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
	const [activeCategoryId, setActiveCategoryId] = useState<number>(0);
	const [isLoadingCategoryChange, setIsLoadingCategoryChange] = useState(false);

	const abortControllerRef = useRef<AbortController | null>(null);
	const { isCategoryVisible = true } = visibility || {};

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

	/**
	 * Функция для отмены существующего запроса.
	 */
	const abortExistingRequest = useCallback(() => {
		if (!abortControllerRef.current) return;
		abortControllerRef.current.abort();
		abortControllerRef.current = null;
	}, []);

	/**
	 * Функция-обработчик для загрузки товаров по категориям.
	 */
	const loadItemsByCategory = useCallback(
		async (categoryId: number) => {
			setIsLoadingCategoryChange(true);
			resetItems();

			const params: ApiParams = {};
			params.categoryId = categoryId !== 0 ? categoryId : undefined;

			try {
				await refetchItems(params, true, 0);
			} finally {
				setTimeout(() => setIsLoadingCategoryChange(false), 300);
			}
		},
		[resetItems, refetchItems],
	);

	/**
	 * Функция-обработчик для выбора категории.
	 */
	const handleCategorySelect = useCallback(
		(categoryId: number) => {
			setActiveCategoryId(categoryId);
			loadItemsByCategory(categoryId);
		},
		[loadItemsByCategory],
	);

	/**
	 * Функция-обработчик для подгрузки следующей порции товаров.
	 */
	const handleLoadMore = useCallback(() => {
		if (!hasMore || loadingMore) return;

		const params: ApiParams = {};
		if (activeCategoryId !== 0) params.categoryId = activeCategoryId;

		loadMoreItems(params);
	}, [hasMore, loadingMore, loadMoreItems, activeCategoryId]);

	// Загрузка категорий
	const { data: categories = [], loading: categoriesLoading } =
		useApiGet<ICatalogCategory[]>(CATEGORIES_API);

	// Загрузка начальных товаров при монтировании компонента
	useEffect(() => {
		loadItemsByCategory(activeCategoryId);
	}, [activeCategoryId, loadItemsByCategory]);

	// Эффект очистки при размонтировании компонента
	useEffect(() => () => abortExistingRequest(), [abortExistingRequest]);

	const loadMoreConfig = {
		isLoading: loadingMore,
		hasMore: hasMore,
		disabled:
			!hasMore || loadingMore || isLoadingCategoryChange || loadingInitial,
		onClick: handleLoadMore,
	};

	return (
		<section className="catalog-section min-height-300 pt-4rem pb-2rem">
			<h2 className="text-center">Каталог</h2>

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
				{(loadingInitial || isLoadingCategoryChange) && <ContentPreloader />}

				{!loadingInitial && !isLoadingCategoryChange && itemsError && (
					<div className="catalog-section__error">
						<p className="text-center color-error">{itemsError.message}</p>
						<button
							type="button"
							className="btn btn-ghost mt-1rem"
							onClick={() => loadItemsByCategory(activeCategoryId)}
							disabled={loadingInitial || isLoadingCategoryChange}
						>
							{loadingInitial || isLoadingCategoryChange
								? "Загрузка..."
								: "Попробовать снова"}
						</button>
					</div>
				)}

				{items.length > 0 && !loadingInitial && !isLoadingCategoryChange && (
					<AnimatedProductList products={items} />
				)}

				{visibility?.isButtonMoreVisible !== false &&
					hasMore &&
					!loadingInitial &&
					!isLoadingCategoryChange && (
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
