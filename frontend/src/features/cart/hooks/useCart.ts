import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addItem, clearCart, removeItem, updateQuantity } from "../store";
import {
	selectCartIsEmpty,
	selectCartItems,
	selectCartTotalAmount,
	selectCartTotalCount,
} from "../store/cartSelectors";
import type {
	AddToCartPayload,
	ICartItem,
	IUseCartActions,
	IUseCartStates,
	RemoveFromCartPayload,
	UpdateQuantityPayload,
} from "../types";

interface IUseCartReturns {
	states: IUseCartStates;
	actions: IUseCartActions;
}

export const useCart = (): IUseCartReturns => {
	const dispatch = useAppDispatch();

	// Селекторы
	const items = useAppSelector(selectCartItems);
	const totalAmount = useAppSelector(selectCartTotalAmount);
	const totalCount = useAppSelector(selectCartTotalCount);
	const isEmpty = useAppSelector(selectCartIsEmpty);

	// Действия
	const addToCart = useCallback(
		(payload: AddToCartPayload) => dispatch(addItem(payload)),
		[dispatch],
	);

	const removeFromCart = useCallback(
		(payload: RemoveFromCartPayload) => dispatch(removeItem(payload)),
		[dispatch],
	);

	const changeQuantity = useCallback(
		(payload: UpdateQuantityPayload) => dispatch(updateQuantity(payload)),
		[dispatch],
	);

	const clearCartItems = useCallback(() => {
		dispatch(clearCart());
	}, [dispatch]);

	// Вспомогательные функции
	const isItemInCart = useCallback(
		(id: number, size: string) => {
			return items.some(
				(item: ICartItem) => item.id === id && item.size === size,
			);
		},
		[items],
	);

	// Возвращаемые значения
	const hookStates: IUseCartStates = {
		items,
		totalAmount,
		totalCount,
		isEmpty,
	};

	const hookActions: IUseCartActions = {
		addToCart,
		removeFromCart,
		changeQuantity,
		clearCartItems,
		isItemInCart,
	};

	return { states: hookStates, actions: hookActions };
};
