import classNames from "classnames";
import { memo } from "react";

import type { IProductSize } from "@/features/product/types";

import "./ProductSizeBtn.scss";

interface IProductSizeBtnProps {
	sizeItem: IProductSize;
	isActive: boolean;
	onClick: (size: string) => void;
}

export const ProductSizeBtn = memo(
	({ sizeItem, isActive, onClick }: IProductSizeBtnProps) => {
		const titleText = !sizeItem.available
			? "Нет в наличии"
			: isActive
				? `Выбран размер: ${sizeItem.size}`
				: "В наличии";

		return (
			<button
				type="button"
				className={classNames("product-size-btn", { selected: isActive })}
				title={titleText}
				aria-pressed={isActive}
				onClick={() => onClick(sizeItem.size)}
				disabled={!sizeItem.available || isActive}
			>
				{sizeItem.size}
			</button>
		);
	},
);
