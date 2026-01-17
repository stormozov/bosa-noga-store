import { useState } from "react";

import { useApiGet } from "@/api";
import { ContentPreloader } from "@/features/Preloader";
import {
	CatalogCategories,
	CatalogCategoriesSkeleton,
	type ICatalogCategory,
	type ProductCardType,
	ProductList,
} from "@/features/product";
import { CATEGORIES_API, ITEMS_API } from "./constants";

import "./CatalogSection.scss";

/**
 * Интерфейс, определяющий конфигурацию видимости элементов в секции каталога.
 *
 * Позволяет управлять отображением отдельных компонентов интерфейса.
 */
interface ICatalogSectionVisibilityConfig {
	/**
	 * Флаг, указывающий, должен ли быть виден блок поиска.
	 */
	isSearchVisible?: boolean;

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
 *
 * Отображает заголовок, список категорий (опционально), прелоадеры при загрузке
 * и список товаров. Поддерживает динамическую загрузку товаров в зависимости 
 * от выбранной категории.
 *
 * @example
 * // Скрыть поиск
 * <CatalogSection visibility={{ isSearchVisible: false }} />
 *
 * @remarks
 * - При выборе категории обновляется URL-адрес запроса к API (`itemsUrl`).
 * - Если категория не выбрана, загружаются все товары.
 * - Использует `useApiGet` для параллельной загрузки товаров и категорий.
 * - Показывает скелетон-заглушку для категорий во время загрузки.
 * - При ошибках загрузки товаров ничего не отображается (может быть улучшено).
 */
export function CatalogSection({ visibility }: ICatalogSectionProps) {
	const [activeCategoryId, setActiveCategoryId] = useState<number>(0);

	const { isCategoryVisible = true } = visibility || {};

	const itemsUrl =
		activeCategoryId === 0
			? ITEMS_API
			: `${ITEMS_API}?categoryId=${activeCategoryId}`;

	const {
		data: items,
		loading: itemsLoading,
		error: itemsError,
	} = useApiGet<ProductCardType[]>(itemsUrl);

	const { data: categories = [], loading: categoriesLoading } =
		useApiGet<ICatalogCategory[]>(CATEGORIES_API);

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
						onCategorySelect={setActiveCategoryId}
					/>
				)}
			</div>

			<div className="catalog-section__items">
				{itemsLoading && <ContentPreloader />}
				{itemsError && null}
				{items && <ProductList products={items} />}
			</div>
		</section>
	);
}
