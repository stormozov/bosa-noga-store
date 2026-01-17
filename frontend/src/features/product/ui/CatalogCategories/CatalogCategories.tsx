import type { ICatalogCategory } from "./types";
import "./CatalogCategories.scss";

/**
 * Интерфейс, описывающий входные данные для компонента
 * {@link CatalogCategories}.
 */
interface ICatalogCategoriesProps {
	/**
	 * Массив объектов категорий, которые необходимо отобразить.
	 *
	 * @see {@link ICatalogCategory}
	 */
	categories: ICatalogCategory[];

	/**
	 * Идентификатор активной (выбранной) категории.
	 */
	activeCategoryId: number;

	/**
	 * Обработчик события выбора категории.
	 */
	onCategorySelect: (id: number) => void;
}

/**
 * Компонент навигации по категориям в каталоге.
 *
 * Отображает список категорий в виде кнопок, включая специальную категорию "Все".
 * Позволяет пользователю выбирать категорию для фильтрации товаров.
 *
 * @example
 * <CatalogCategories
 *   categories={categories}
 *   activeCategoryId={1}
 *   onCategorySelect={handleSelect}
 * />
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
