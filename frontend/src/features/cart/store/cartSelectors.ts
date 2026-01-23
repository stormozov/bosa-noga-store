import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/app/types";

// БАЗОВЫЕ СЕЛЕКТОРЫ
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalAmount = (state: RootState) =>
	state.cart.totalAmount;
export const selectCartTotalCount = (state: RootState) => state.cart.totalCount;

// ДОПОЛНИТЕЛЬНЫЕ СЕЛЕКТОРЫ
export const selectCartIsEmpty = createSelector(
	selectCartItems,
	(items) => items.length === 0,
);
