import type { ICatalogCategory } from "./types";

import "./CatalogCategories.scss";

interface ICatalogCategoriesProps {
	categories: ICatalogCategory[];
	activeCategoryId: number;
	onCategorySelect: (id: number) => void;
}

/**
 * Компонент навигации по категориям в каталоге.
 *
 * Отображает список категорий в виде кнопок, включая специальную категорию "Все".
 * Позволяет пользователю выбирать категорию для фильтрации товаров.
 *
 * @remarks
 * - В начало списка всегда добавляется категория "Все" с `id: 0`.
 * - Кнопка активной категории заблокирована (`disabled`), чтобы предотвратить
 *   повторный клик.
 */
export function CatalogCategories({
	categories,
	activeCategoryId,
	onCategorySelect,
}: ICatalogCategoriesProps) {
	const categoryAll: ICatalogCategory = { id: 0, title: "Все" };
	const sortedCategories = [categoryAll, ...categories];

	return (
		<ul className="catalog-categories">
			{sortedCategories.map((category) => (
				<li key={category.id} className="catalog-categories__item">
					<button
						type="button"
						className={"catalog-categories__btn"}
						onClick={() => onCategorySelect(category.id)}
						disabled={category.id === activeCategoryId}
					>
						{category.title}
					</button>
				</li>
			))}
		</ul>
	);
}
