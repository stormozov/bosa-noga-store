/** Тип, представляющий допустимые варианты названий платежных систем. */
export type IPaySystemsVariants =
	| "PayPal"
	| "Visa"
	| "MasterCard"
	| "Yandex"
	| "WebMoney"
	| "Qiwi";

export interface IPaySystemProps {
	/** Отображаемое название платежной системы. */
	displayName: IPaySystemsVariants;

	/**
	 * Ссылка на официальный сайт платежной системы или связанную внешнюю ссылку.
	 */
	link: string;

	/** Флаг видимости платежной системы. */
	visible: boolean;
}
