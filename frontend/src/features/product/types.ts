/**
 * Интерфейс, описывающий размер товара и его доступность.
 */
export interface IProductSize {
	/**
	 * Размер товара, представленный в виде строки.
	 */
	size: string;

	/**
	 * Флаг, указывающий, доступен ли данный размер для заказа.
	 */
	available: boolean;
}

/**
 * Интерфейс, описывающий один товар.
 */
export interface IProduct {
	id: number;
	category: number;
	title: string;
	price: number;
	oldPrice?: number;
	images: string[];
	sku: string;
	manufacturer: string;
	color: string;
	material: string;
	reason: string;
	season: string;
	heelSize: string;
	sizes: IProductSize[];
}

/**
 * Массив кортежа, содержащий список полей, используемых в карточке товара.
 *
 * Эти поля определяют, какие данные о товаре передаются или отображаются
 * на уровне карточки товара (например, в списке товаров).
 *
 * @example
 * const productCardData = pick(product, PRODUCT_CARD_FIELDS);
 */
export const PRODUCT_CARD_FIELDS = [
	"id",
	"category",
	"title",
	"price",
	"images",
] as const;

/**
 * Массив кортежа, содержащий список полей, используемых в детальной
 * информации о товаре.
 *
 * Эти поля содержат дополнительные характеристики товара, отображаемые
 * на странице с подробным описанием.
 *
 * @example
 * const productDetails = pick(product, PRODUCT_DETAILS_FIELDS);
 */
export const PRODUCT_DETAILS_FIELDS = [
	"sku",
	"manufacturer",
	"color",
	"material",
	"season",
	"reason",
	"images",
] as const;

/**
 * Тип, представляющий допустимые ключи полей, используемых в карточке товара.
 *
 * Извлекает литеральные строки из кортежа `PRODUCT_CARD_FIELDS` и формирует
 * юнион-тип. Каждое значение представляет собой название поля товара,
 * отображаемого в карточке.
 *
 * @example
 * type Fields = ProductCardFields; // "id" | "category" | "title" | "price" | "images"
 */
export type ProductCardFields = (typeof PRODUCT_CARD_FIELDS)[number];

/**
 * Тип, представляющий допустимые ключи полей, используемых в детальной
 * информации о товаре.
 *
 * Извлекает литеральные строки из кортежа {@link PRODUCT_DETAILS_FIELDS}
 * и формирует юнион-тип. Каждое значение соответствует одной из характеристик
 * товара, показываемых на странице деталей.
 *
 * @example
 * type Details = ProductDetailsFields; // "sku" | "manufacturer" | "color" | "material" | "season" | "reason" | "images"
 */
export type ProductDetailsFields = (typeof PRODUCT_DETAILS_FIELDS)[number];

export type ProductCardType = Pick<IProduct, ProductCardFields>;
export type ProductDetailsType = Pick<IProduct, ProductDetailsFields>;
