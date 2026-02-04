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

const initialState: ICartState = {
	items: [],
	totalAmount: 0,
	totalCount: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<AddToCartPayload>) => {
			const { id, size, price, title, count, image } = action.payload;
			const addCount = count || productsConfig.minCountForOrder;

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

			const { totalAmount, totalCount } = calculateTotals(state.items);
			state.totalAmount = totalAmount;
			state.totalCount = totalCount;
		},

		removeItem: (state, action: PayloadAction<RemoveFromCartPayload>) => {
			const { id, size } = action.payload;

			state.items = state.items.filter(
				(item) => !(item.id === id && item.size === size),
			);

			const { totalAmount, totalCount } = calculateTotals(state.items);
			state.totalAmount = totalAmount;
			state.totalCount = totalCount;
		},

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

			const { totalAmount, totalCount } = calculateTotals(state.items);
			state.totalAmount = totalAmount;
			state.totalCount = totalCount;
		},

		clearCart: (state) => {
			state.items = [];
			state.totalAmount = 0;
			state.totalCount = 0;
		},

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
