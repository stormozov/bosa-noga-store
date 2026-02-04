import { createTransform } from "redux-persist";

import type { cartReducer } from "..";
import { calculateTotals } from "../utils";

export const cartTransform = createTransform(
	(state: ReturnType<typeof cartReducer>) => {
		return { items: state.items };
	},
	(state) => {
    const items = state.items || [];
		const { totalAmount, totalCount } = calculateTotals(items);
		return { items, totalAmount, totalCount };
	},
	{ whitelist: ["cart"] },
);
