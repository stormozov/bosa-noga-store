import { memo } from "react";

import type { IProductSize } from "@/features/product/types";
import { ProductSizeBtn } from "../ProductSizeBtn";

import "./ProductSizesList.scss";

interface ProductSizesListProps {
	sizes: IProductSize[];
	activeSize: string | null;
	onClick: (size: string) => void;
}

/**
 * Компонент списка размеров товара.
 *
 * Отображает доступные размеры в виде набора кнопок. Позволяет выбирать размер
 * и отображает статус наличия (в наличии / нет в наличии).
 *
 * @example
 * ```tsx
 * <ProductSizesList
 *   sizes={[
 *     { size: "S", available: true },
 *     { size: "M", available: false },
 *     { size: "L", available: true }
 *   ]}
 *   activeSize="M"
 *   onClick={(size) => console.log(`Выбран размер: ${size}`)}
 * />
 * ```
 */
export const ProductSizesList = memo(
	({ sizes, activeSize, onClick }: ProductSizesListProps) => (
		<div className="product-sizes d-flex align-items-center justify-content-center">
			<p className="product-sizes__label">Размеры в наличии:</p>
			<ul className="product-sizes__list d-flex flex-wrap align-items-center">
				{sizes.map((sizeItem) => (
					<li key={sizeItem.size} className="product-sizes__item">
						<ProductSizeBtn
							sizeItem={sizeItem}
							isActive={activeSize === sizeItem.size}
							onClick={onClick}
						/>
					</li>
				))}
			</ul>
		</div>
	),
);
