import type { HttpMethod, IApiOptions, IFetchConfig } from "./types";

const DEFAULT_TIMEOUT = 10 * 1000; // в миллисекундах

/**
 * Выполняет HTTP-запрос по указанному URL.
 */
const request = async <T>(
	url: string,
	method: HttpMethod,
	body?: unknown,
	options: IApiOptions = {},
): Promise<T> => {
	const { headers = {}, timeout = DEFAULT_TIMEOUT } = options;

	const config: IFetchConfig = {
		method,
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
		timeout,
	};

	if (body !== undefined) {
		config.body = JSON.stringify(body);
	}

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(url, {
			...config,
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			let errorText = `HTTP error! status: ${response.status}`;

			try {
				const errorData = await response.text();
				if (errorData && errorData !== "null") {
					errorText = errorData;
				}
			} catch {
				// Игнорируем ошибки при чтении тела ошибки
			}

			throw new Error(errorText);
		}

		if (response.status === 204) return undefined as T;

		const data: T = await response.json();
		return data;
	} catch (error) {
		clearTimeout(timeoutId);

		if (error instanceof DOMException && error.name === "AbortError") {
			throw new Error("Request timeout");
		}

		throw error;
	}
};

/**
 * Выполняет HTTP GET-запрос по указанному URL.
 */
export const get = async <T>(
	url: string,
	options?: IApiOptions,
): Promise<T> => {
	return request<T>(url, "GET", undefined, options);
};

/**
 * Выполняет HTTP POST-запрос по указанному URL с переданным телом.
 */
export const post = async <T>(
	url: string,
	body: unknown,
	options?: IApiOptions,
): Promise<T> => {
	return request<T>(url, "POST", body, options);
};
