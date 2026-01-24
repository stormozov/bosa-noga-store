import classNames from "classnames";
import { Link, useLocation } from "react-router";

import { useCart } from "@/features/cart";

import "./CartWidget.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link CartWidget}.
 */
interface ICartWidgetProps {
	/** Дополнительные классы */
	classes?: string;
}

/**
 * Компонент виджета корзины.
 *
 * Отображает иконку корзины и количество товаров в ней.
 */
export function CartWidget({ classes }: ICartWidgetProps) {
	const location = useLocation();
	const {
		states: { totalCount },
	} = useCart();

	const isCartPage = location.pathname === "/cart";
	const hasItems = totalCount > 0;

	return (
		<div className={classNames("cart-widget", classes)}>
			{isCartPage ? (
				<div className="cart-widget__icon" title="Вы уже на странице корзины" />
			) : (
				<Link
					to="/cart"
					className="cart-widget__link"
					aria-label="Перейти в корзину"
					title="Перейти в корзину"
				/>
			)}

			{hasItems && <div className="cart-widget__count">{totalCount}</div>}
		</div>
	);
}
