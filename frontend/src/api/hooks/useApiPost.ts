import { useCallback, useState } from "react";

import type { ICartOrderPostData } from "@/features/cart";

import { post } from "../core";

const API_URL = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Параметры запроса по умолчанию
 */
const POST_OPTIONS = { timeout: 30_000 };

/**
 * Интерфейс возвращаемого значения кастомного хука {@link useApiPost}.
 */
interface IUseApiPostResult {
	/** Флаг загрузки */
	isLoading: boolean;
	/** Возможная ошибка */
	error: string | null;
	/** Флаг успеха */
	success: boolean;
	/** Функция отправки заказа */
	submitOrder: (data: ICartOrderPostData) => Promise<void>;
	/** Функция сброса состояния */
	reset: () => void;
}

/**
 * Кастомный хук для отправки заказа на сервер
 *
 * @returns Объект с функцией отправки заказа и состоянием
 *
 * @example
 * const { submitOrder, isLoading, error, success, reset } = useOrderSubmit();
 *
 * const handleSubmit = async () => {
 *   await submitOrder({
 *     owner: { phone: '+79991234567', address: 'ул. Пушкина, д. 10' },
 *     items: [
 *       { id: 1, price: 1000, count: 2 },
 *       { id: 2, price: 500, count: 1 }
 *     ]
 *   });
 * };
 */
export const useApiPost = (): IUseApiPostResult => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const submitOrder = useCallback(
		async (data: ICartOrderPostData): Promise<void> => {
			setIsLoading(true);
			setError(null);
			setSuccess(false);

			try {
				await post<void>(`${API_URL}/api/order`, data, POST_OPTIONS);
				setSuccess(true);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Неизвестная ошибка");
			} finally {
				setTimeout(() => setIsLoading(false), 1000);
			}
		},
		[],
	);

	const reset = useCallback(() => {
		setIsLoading(false);
		setError(null);
		setSuccess(false);
	}, []);

	return {
		// Состояния
		isLoading,
		error,
		success,

		// Функции
		submitOrder,
		reset,
	};
};
