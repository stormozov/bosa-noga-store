import { Link } from "react-router";

import { type ICartItem, useCart } from "@/features/cart";
import { formatRubles } from "@/shared/utils";

import "./CartTableItem.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link CartTableItem}.
 */
interface ICartTableItemProps {
	/** Элемент корзины, данные которого нужно отобразить в таблице */
	item: ICartItem;
}

/**
 * Компонент, отображающий одну позицию корзины.
 */
export function CartTableItem({ item }: ICartTableItemProps) {
	const { id, title, size, count, price, total } = item;

	const {
		actions: { removeFromCart },
	} = useCart();

	const handleRemove = () => {
		const confirm = window.confirm("Вы уверены, что хотите удалить товар?");
		if (confirm) removeFromCart({ id, size });
	};

	return (
		<tr key={id}>
			<td>{id}</td>
			<td>
				<Link to={`/catalog/${id}`} className="table-link" title={title}>
					{title}
				</Link>
			</td>
			<td>{size}</td>
			<td>{count}</td>
			<td>{formatRubles(price)}</td>
			<td>{formatRubles(total)}</td>
			<td>
				<button
					type="button"
					className="btn btn-outline-danger btn-sm"
					onClick={handleRemove}
				>
					Удалить
				</button>
			</td>
		</tr>
	);
}
