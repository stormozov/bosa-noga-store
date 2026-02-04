import { useCallback, useState } from "react";

import { API_BASE_URL } from "@/configs/config";
import type { ICartOrderPostData } from "@/features/cart";

import { post } from "../core";

const API_URL = `${API_BASE_URL}/api/order`;
const DEFAULT_POST_OPTIONS = { timeout: 30_000 };

interface IUseApiPostResult {
	isLoading: boolean;
	error: string | null;
	success: boolean;

	submitOrder: (data: ICartOrderPostData) => Promise<void>;
	reset: () => void;
}

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
				await post<void>(API_URL, data, DEFAULT_POST_OPTIONS);
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
