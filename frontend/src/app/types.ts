import type { ICartState } from "@/features/cart/types";

import type { store } from "./store";

export type RootState = {
	cart: ICartState;
};

export type AppDispatch = typeof store.dispatch;
