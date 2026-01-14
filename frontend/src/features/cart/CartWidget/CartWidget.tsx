import classNames from "classnames";
import { Link } from "react-router";

import "./CartWidget.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link CartWidget}.
 */
interface ICartWidgetProps {
	classes?: string;
}

/**
 * Компонент виджета корзины.
 * 
 * Отображает иконку корзины и количество товаров в ней.
 */
export function CartWidget({ classes }: ICartWidgetProps) {
	return (
		<div className="cart-widget">
			<Link
				to="/cart"
				className={classNames("cart-widget__link", classes)}
			></Link>
			<div className="cart-widget__count">1</div>
		</div>
	);
}
