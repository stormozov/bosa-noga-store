import { Link } from "react-router";

import type { ProductCardType } from "@/features/product/types";
import { formatRubles } from "@/shared/utils";

import "./ProductCard.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link ProductCard}.
 */
interface IProductCartProps {
	/**
	 * Данные о товаре, которые необходимо отобразить в карточке.
	 *
	 * @see {@link ProductCardType}
	 */
	product: ProductCardType;
}

/**
 * Компонент карточки товара, отображающий краткую информацию о товаре.
 *
 * Показывает изображение, название, цену и кнопку-ссылку для перехода
 * к странице товара. Используется внутри компонента {@link ProductList}
 * для рендеринга отдельных товаров.
 *
 * @example
 * <ProductCard product={product} />
 *
 * @remarks
 * - Первое изображение из массива `images` используется как основное.
 * - Атрибут `alt` на изображении содержит название товара для доступности.
 * - Класс `h-100` обеспечивает равную высоту карточек в одной строке.
 * - Ссылка ведёт на страницу деталей товара по его `id`.
 */
export function ProductCard({ product }: IProductCartProps) {
	const { id, title, price, images } = product;

	return (
		<div className="product-card card h-100">
			<img
				src={images[0]}
				alt={title}
				className="product-card__img card-img-top img-fluid"
			/>
			<div className="product-card__content card-body">
				<p className="product-card__title" title={title}>
					{title}
				</p>
				<p className="product-card__price">{formatRubles(price)}</p>
				<Link
					to={`/catalog/${id}`}
					className="product-card__btn btn"
					area-label="Заказать"
				>
					Заказать
				</Link>
			</div>
		</div>
	);
}
