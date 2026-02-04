import { useApiGet } from "@/api";
import { API_BASE_URL } from "@/configs/config";
import { ContentPreloader } from "@/features/Preloader";
import { type ProductCardType, ProductList } from "@/features/product";

import "./HitsSection.scss";

const API_URL = `${API_BASE_URL}/api/top-sales`;

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
