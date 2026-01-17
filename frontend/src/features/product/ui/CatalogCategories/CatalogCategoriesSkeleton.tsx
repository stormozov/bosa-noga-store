import { v4 as uuidv4 } from "uuid";

/**
 * Интерфейс, описывающий свойства компонента {@link CatalogCategoriesSkeleton}.
 */
interface ICatalogCategoriesSkeletonProps {
	/**
	 * Количество категорий, которые нужно отобразить.
	 */
	count: number;
}

/**
 * Компонент-заглушка (скелетон) для отображения загрузки категорий в каталоге.
 *
 * Отображает указанное количество элементов-заглушек, имитирующих элементы
 * категорий. Используется, пока данные о категориях загружаются.
 *
 * @example
 * <CatalogCategoriesSkeleton count={6} />
 */
export function CatalogCategoriesSkeleton({
	count,
}: ICatalogCategoriesSkeletonProps) {
	return (
		<div className="catalog-categories__skeleton-container">
			{Array.from({ length: count }).map(() => (
				<div
					key={`skeleton-${uuidv4()}`}
					className="catalog-categories__skeleton-item"
				/>
			))}
		</div>
	);
}
