/**
 * Интерфейс элемента корзины.
 *
 * Описывает структуру одного товара в корзине покупок.
 */
export interface ICartItem {
	/** Уникальный идентификатор товара */
	id: number;

	/** Название товара */
	title: string;

	/** Размер товара (например, "18 US", "38 EU") */
	size: string;

	/** Количество единиц данного товара в корзине */
	count: number;

	/** Цена за одну единицу товара */
	price: number;

	/** Общая стоимость данного товара (price × count) */
	total: number;

	/** URL изображения товара (опционально) */
	image?: string;
}

/**
 * Интерфейс состояния корзины.
 *
 * Описывает полную структуру состояния корзины в Redux-хранилище.
 */
export interface ICartState {
	/** Массив товаров в корзине */
	items: ICartItem[];

	/** Итоговая сумма всех товаров в корзине */
	totalAmount: number;

	/** Общее количество единиц товаров в корзине */
	totalCount: number;
}

/**
 * Тип данных для действия добавления товара в корзину.
 *
 * Наследует все поля {@link ICartItem} кроме `count` и `total`, добавляет
 * опциональное поле `count` (если не указано — используется значение
 * по умолчанию).
 */
export type AddToCartPayload = Omit<ICartItem, "count" | "total"> & {
	/** Количество товара (опционально, по умолчанию 1) */
	count?: number;
};

/**
 * Тип данных для действия удаления товара из корзины.
 *
 * Содержит ключевые поля для идентификации товара.
 */
export type RemoveFromCartPayload = {
	/** Идентификатор товара */
	id: number;

	/** Размер товара (например, "18 US", "38 EU") */
	size: string;
};

/**
 * Тип данных для действия изменения количества товара в корзине.
 *
 * Содержит информацию для идентификации товара и новое количество.
 */
export type UpdateQuantityPayload = {
	/** Идентификатор товара */
	id: number;

	/** Размер товара (например, "18 US", "38 EU") */
	size: string;

	/** Новое количество товара */
	count: number;
};

/**
 * Тип данных для действия восстановления корзины.
 *
 * Представляет собой массив элементов корзины.
 */
export type RestoreCartPayload = ICartItem[];

/**
 * Интерфейс утилиты для расчёта итоговых значений корзины.
 *
 * Описывает структуру объекта с результатами расчёта итогов.
 */
export interface ICalculateTotalsUtils {
	/** Итоговая сумма всех товаров */
	totalAmount: number;

	/** Общее количество единиц товаров */
	totalCount: number;
}

/**
 * Интерфейс, описывающий состояния корзины
 */
export interface IUseCartStates {
	/** Список товаров в корзине */
	items: ICartItem[];

	/** Общая сумма товаров в корзине */
	totalAmount: number;

	/** Общее количество товаров в корзине */
	totalCount: number;

	/** Пустая ли корзина */
	isEmpty: boolean;
}

/**
 * Интерфейс, описывающий действия с корзиной
 */
export interface IUseCartActions {
	/** Добавление товара в корзину */
	addToCart: (payload: AddToCartPayload) => void;

	/** Удаление товара из корзины */
	removeFromCart: (payload: RemoveFromCartPayload) => void;

	/** Изменение количества товара */
	changeQuantity: (payload: UpdateQuantityPayload) => void;

	/** Очистка корзины */
	clearCartItems: () => void;

	/** Проверка наличия товара в корзине */
	isItemInCart: (id: number, size: string) => boolean;
}

/**
 * Интерфейс, описывающий данные пользователя из формы заказа
 */
export interface IOrderFormData {
	/** Номер телефона */
	phone: string;

	/** Адрес доставки */
	address: string;
}

/**
 * Интерфейс, описывающий данные заказа
 */
export interface ICartOrderPostData {
	/** Данные пользователя, полученные из формы заказа */
	owner: IOrderFormData;

	/** Список товаров */
	items: ICartItem[];
}
