import type { ProductCardType } from "@/features/product/types";
import { ProductCard } from "../ProductCard";

import "./ProductList.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link ProductList}.
 */
interface IProductListProps {
	/**
	 * Товары, которые необходимо отобразить в списке.
	 *
	 * @see {@link ProductCardType}
	 */
	products: ProductCardType[];
}

/**
 * Компонент списка товаров, отображающий коллекцию карточек товаров в виде
 * сетки.
 *
 * Принимает массив объектов товаров и рендерит каждый из них с помощью
 * компонента {@link ProductCard}. Использует разметку на основе Bootstrap
 * (через классы `row` и `col-4`).
 *
 * @example
 * <ProductList products={products} />
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
