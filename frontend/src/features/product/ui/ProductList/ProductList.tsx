import type { ProductCardType } from "@/features/product/types";

import { ProductCard } from "../ProductCard";

import "./ProductList.scss";

interface IProductListProps {
	products: ProductCardType[];
}

/**
 * Компонент списка товаров, отображающий коллекцию карточек товаров в виде
 * сетки.
 *
 * Принимает массив объектов товаров и рендерит каждый из них с помощью
 * компонента {@link ProductCard}. Использует разметку на основе Bootstrap
 * (через классы `row` и `col-4`).
 */
export function ProductList({ products }: IProductListProps) {
	return (
		<div className="product-list">
			<div className="row">
				{products.map((product) => (
					<div key={product.id} className="col-4">
						<ProductCard product={product} />
					</div>
				))}
			</div>
		</div>
	);
}
