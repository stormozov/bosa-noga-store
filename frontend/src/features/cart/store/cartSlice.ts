import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

import productsConfig from "@/configs/product.json";
import type {
	AddToCartPayload,
	ICartItem,
	ICartState,
	RehydrateAction,
	RemoveFromCartPayload,
	RestoreCartPayload,
	UpdateQuantityPayload,
} from "../types";
import { calculateTotals, handleRehydrate } from "../utils";

/**
 * Инициализация состояния слайса корзины
 */
const initialState: ICartState = {
	items: [],
	totalAmount: 0,
	totalCount: 0,
};

/**
 * Слайс корзины
 */
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		// Добавление товара в корзину
		addItem: (state, action: PayloadAction<AddToCartPayload>) => {
			const { id, size, price, title, count, image } = action.payload;
			const addCount = count || productsConfig.minCountForOrder;

			// Проверяем, есть ли уже такой товар с таким размером
			const existingIndex = state.items.findIndex(
				(item) => item.id === id && item.size === size,
			);

			if (existingIndex >= 0) {
				const newCount = Math.min(
					state.items[existingIndex].count + addCount,
					productsConfig.maxCountForOrder,
				);
				state.items[existingIndex].count = newCount;
				state.items[existingIndex].total = newCount * price;
			} else {
				// Добавляем новый товар
				const newItem: ICartItem = {
					id,
					title,
					size,
					price,
					count: addCount,
					total: addCount * price,
					image,
				};
				state.items.push(newItem);
			}

			// Пересчитываем итоги
			const { totalAmount, totalCount } = calculateTotals(state.items);
			state.totalAmount = totalAmount;
			state.totalCount = totalCount;
		},

		// Удаление товара из корзины
		removeItem: (state, action: PayloadAction<RemoveFromCartPayload>) => {
			const { id, size } = action.payload;

			state.items = state.items.filter(
				(item) => !(item.id === id && item.size === size),
			);

			// Пересчитываем итоги
			const { totalAmount, totalCount } = calculateTotals(state.items);
			state.totalAmount = totalAmount;
			state.totalCount = totalCount;
		},

		// Изменение количества товара
		updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
			const { id, size, count } = action.payload;
			const itemIndex = state.items.findIndex(
				(item) => item.id === id && item.size === size,
			);

			if (
				itemIndex >= 0 &&
				count >= 1 &&
				count <= productsConfig.maxCountForOrder
			) {
				state.items[itemIndex].count = count;
				state.items[itemIndex].total = count * state.items[itemIndex].price;
			}

			// Пересчитываем итоги
			const { totalAmount, totalCount } = calculateTotals(state.items);
			state.totalAmount = totalAmount;
			state.totalCount = totalCount;
		},

		// Очистка корзины (после успешного заказа)
		clearCart: (state) => {
			state.items = [];
			state.totalAmount = 0;
			state.totalCount = 0;
		},

		// Восстановление корзины
		restoreCart: (state, action: PayloadAction<RestoreCartPayload>) => {
			state.items = action.payload;
			const { totalAmount, totalCount } = calculateTotals(action.payload);
			state.totalAmount = totalAmount;
			state.totalCount = totalCount;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(REHYDRATE, (state, action: RehydrateAction) => {
			const items = action.payload?.cart?.items;
			if (!items) return;

			handleRehydrate(state, items);
		});
	},
});

export const { addItem, removeItem, updateQuantity, clearCart, restoreCart } =
	cartSlice.actions;

export default cartSlice.reducer;
