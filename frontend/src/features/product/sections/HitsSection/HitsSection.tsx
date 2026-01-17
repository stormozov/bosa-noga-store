import { useApiGet } from "@/api";
import { ContentPreloader } from "@/features/Preloader";
import { type ProductCardType, ProductList } from "@/features/product";

import "./HitsSection.scss";

/**
 * API-эндпоинт для получения списка хитов продаж.
 */
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/top-sales`;

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

	return (
		<section className="top-sales-section min-height-300 pt-4rem">
			<h2 className="text-center">Хиты продаж!</h2>
			{loading && <ContentPreloader />}
			{error && null}
			{data && <ProductList products={data} />}
		</section>
	);
}
