import "./TwoColumnTable.scss";

interface ITwoColumnTableProps {
	/**
	 * Данные для отображения в таблице.
	 *
	 * Объект, где:
	 * - ключ (string) — значение для первой колонки;
	 * - значение (string) — значение для второй колонки.
	 */
	data: Record<string, string>;
}

/**
 * Компонент двух колоночной таблицы.
 *
 * @example
 * ```tsx
 * <TwoColumnTable data={{
 *   "Имя": "Иван",
 *   "Возраст": "25",
 *   "Город": "Москва"
 * }} />
 * ```
 */
export function TwoColumnTable({ data }: ITwoColumnTableProps) {
	return (
		<table className="two-column-table table table-bordered">
			<tbody>
				{Object.entries(data).map(([key, value]) => (
					<tr key={key}>
						<td>{key}</td>
						<td>{value}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
