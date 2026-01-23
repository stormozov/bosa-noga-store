import type { ICartItem } from "@/features/cart";
import { CartTableItem, useCart } from "@/features/cart";
import { formatRubles } from "@/shared/utils";

import "./CartTable.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link CartTable}.
 */
interface ICartTableProps {
	/** Заголовки таблицы. */
	headers: string[];

	/** Позиции корзины. */
	items: ICartItem[];
}

/**
 * Компонент таблицы корзины.
 */
export function CartTable({ headers, items }: ICartTableProps) {
	const {
		states: { totalAmount },
	} = useCart();

	return (
		<table className="cart-table table table-bordered">
			<thead>
				<tr>
					{headers.map((header) => (
						<th scope="col" key={header}>
							{header}
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{items.map((item) => (
					<CartTableItem key={item.id} item={item} />
				))}
			</tbody>

			<tfoot>
				<tr>
					<td colSpan={5} className="text-right">
						Общая стоимость
					</td>
					<td>{formatRubles(totalAmount)}</td>
				</tr>
			</tfoot>
		</table>
	);
}
