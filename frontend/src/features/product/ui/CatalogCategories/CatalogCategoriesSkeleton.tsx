const currentDate = new Date().toLocaleString("en-US", { hour: "numeric" });

interface ICatalogCategoriesSkeletonProps {
	count?: number;
}

/**
 * Компонент-заглушка (скелетон) для отображения загрузки категорий в каталоге.
 *
 * Отображает указанное количество элементов-заглушек, имитирующих элементы
 * категорий.
 */
export function CatalogCategoriesSkeleton({
	count = 1,
}: ICatalogCategoriesSkeletonProps) {
	return (
		<div className="catalog-categories__skeleton-container">
			{Array.from({ length: count }).map((_, idx) => (
				<div
					key={`skeleton-${idx}-${currentDate}`}
					className="catalog-categories__skeleton-item"
				/>
			))}
		</div>
	);
}
