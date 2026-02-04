import { configureStore } from "@reduxjs/toolkit";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	persistReducer,
	persistStore,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

import { cartLogger, cartReducer, cartTransform } from "@/features/cart";

const createNoopStorage = () => {
	return {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		getItem(_key: string): Promise<null> {
			return Promise.resolve(null);
		},
		setItem(_key: string, value: string): Promise<string> {
			return Promise.resolve(value);
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		removeItem(_key: string): Promise<void> {
			return Promise.resolve();
		},
	};
};

const storage =
	typeof window !== "undefined"
		? createWebStorage("local")
		: createNoopStorage();

const persistConfig = {
	key: "cart",
	storage,
	transforms: [cartTransform],
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
	reducer: {
		cart: persistedReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(cartLogger),
});

export const persistor = persistStore(store);
