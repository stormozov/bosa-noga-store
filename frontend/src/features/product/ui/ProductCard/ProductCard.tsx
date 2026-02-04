import { Link } from "react-router";

import type { ProductCardType } from "@/features/product/types";
import { formatRubles } from "@/shared/utils";

import "./ProductCard.scss";

interface IProductCartProps {
	product: ProductCardType;
}

export function ProductCard({ product }: IProductCartProps) {
	const { id, title, price, images } = product;

	return (
		<div className="product-card card h-100">
			<img
				src={images[0]}
				alt={title}
				className="product-card__img card-img-top img-fluid"
				loading="lazy"
				title={title}
			/>
			<div className="product-card__content card-body">
				<p className="product-card__title" title={title}>
					{title}
				</p>
				<p className="product-card__price">{formatRubles(price)}</p>
				<Link
					to={`/catalog/${id}`}
					className="product-card__btn btn btn-ghost"
					area-label="Заказать"
				>
					Заказать
				</Link>
			</div>
		</div>
	);
}
