import type { Middleware } from "@reduxjs/toolkit";

import type { RootState } from "@/app/types";

/**
 * Middleware для логирования действий в корзине
 */
export const cartLogger: Middleware<object, RootState> =
	(store) => (next) => (action) => {
		if (typeof action !== "object" || action === null || !("type" in action)) {
			return next(action);
		}

		if (String(action.type).startsWith("cart/")) {
			console.group(`Cart Action: ${action.type}`);
			console.log("Previous state:", store.getState().cart);

			if ("payload" in action && action.payload !== undefined) {
				console.log("Action payload:", action.payload);
			}

			const result = next(action);

			console.log("Next state:", store.getState().cart);
			console.groupEnd();

			return result;
		}

		return next(action);
	};
