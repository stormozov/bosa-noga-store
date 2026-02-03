import { useApiGet } from "@/api";
import { API_BASE_URL } from "@/configs/config";
import { ContentPreloader } from "@/features/Preloader";
import { type ProductCardType, ProductList } from "@/features/product";

import "./HitsSection.scss";

/**
 * API-эндпоинт для получения списка хитов продаж.
 */
const API_URL = `${API_BASE_URL}/api/top-sales`;

/**
 * Компонент секции "Хиты продаж", отображающий список популярных товаров.
 *
 * Загружает данные о товарах с помощью кастомного хука {@link useApiGet},
 * отображает прелоадер во время загрузки, а по завершении — список товаров
 * через компонент {@link ProductList}.
 *
 * @example
 * <HitsSection />
 *
 * @remarks
 * - Использует URL {@link API_URL} для получения списка хитов продаж.
 * - Пока данные загружаются, показывается компонент {@link ContentPreloader}.
 * - В случае ошибки загрузки — ничего не отображается.
 * - После получения данных отображает список товаров с помощью компонента
 * 	 {@link ProductList}.
 */
export function HitsSection() {
	const { data, loading, error } = useApiGet<ProductCardType[]>(API_URL);

	if (error) return null;

	if (!loading && (!data || data.length === 0)) return null;

	const products = !loading && data ? data : null;

	return (
		<section className="top-sales-section pt-4rem">
			<h2 className="text-center">Хиты продаж!</h2>
			{loading ? (
				<ContentPreloader />
			) : products ? (
				<ProductList products={products} />
			) : null}
		</section>
	);
}
