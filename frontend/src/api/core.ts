import type { HttpMethod, IApiOptions, IFetchConfig } from "./types";

/**
 * Дефолтное время ожидания запроса в миллисекундах
 */
const DEFAULT_TIMEOUT = 10 * 1000; // 10 seconds

/**
 * Универсальная асинхронная функция для выполнения HTTP-запросов
 * с поддержкой таймаута.
 *
 * @template T - Тип данных, ожидаемых в теле ответа.
 *
 * @param url - Адрес, по которому будет выполнен запрос.
 * @param method - HTTP-метод запроса (например, 'GET', 'POST', 'PUT', 'DELETE'
 * и т.д.).
 * @param body - Тело запроса (необязательно). Если передано, будет
 * сериализовано в JSON.
 * @param options - Дополнительные параметры запроса.
 *
 * @returns Промис, который разрешается с данными типа `T`.
 *
 * @throws Ошибка, если:
 * - Запрос не удался (сеть, сервер вернул статус не в диапазоне 200-299).
 * - Превышено время ожидания ответа (таймаут).
 *
 * @see {@link IFetchConfig}
 * @see {@link IApiOptions}
 * @see {@link DEFAULT_TIMEOUT}
 *
 * @example
 * const data = await request<User>('/api/user/1', 'GET');
 * console.log(data.name); // "Иван"
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
			throw new Error(`HTTP error! status: ${response.status}`);
		}

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
 *
 * @template T - Тип данных, ожидаемых в ответе от сервера.
 *
 * @param url - Адрес, по которому будет выполнен GET-запрос.
 * @param options - Необязательные параметры запроса, такие как заголовки
 * или таймаут. Наследуется от интерфейса {@link IApiOptions}.
 *
 * @returns Промис, который разрешается с данными типа `T`.
 *
 * @throws Ошибка, если запрос завершился неудачно (сетевая ошибка, таймаут,
 * статус не 2xx).
 *
 * @see {@link request}
 * @see {@link IApiOptions}
 *
 * @example
 * try {
 *   const user = await get<User>('/api/user/1');
 *   console.log(user.name);
 * } catch (error) {
 *   console.error('Ошибка при получении данных:', error);
 * }
 */
export const get = async <T>(
	url: string,
	options?: IApiOptions,
): Promise<T> => {
	return request<T>(url, "GET", undefined, options);
};

/**
 * Выполняет HTTP POST-запрос по указанному URL с переданным телом.
 *
 * @template T - Тип данных, ожидаемых в ответе от сервера.
 *
 * @param url - Адрес, по которому будет выполнен POST-запрос.
 * @param body - Данные, отправляемые в теле запроса. Будут автоматически
 * сериализованы в JSON.
 * @param options - Необязательные параметры запроса, такие как заголовки
 * или таймаут. Наследуется от интерфейса `IApiOptions`.
 *
 * @returns Промис, который разрешается данными типа `T`, полученными в ответе.
 *
 * @throws Ошибка, если запрос завершился неудачно (сетевая ошибка, таймаут,
 * статус не 2xx).
 *
 * @see {@link request}
 * @see {@link IApiOptions}
 *
 * @example
 * try {
 *   const newUser = await post<User>('/api/users', { name: 'Иван', age: 30 });
 *   console.log('Пользователь создан:', newUser);
 * } catch (error) {
 *   console.error('Ошибка при создании пользователя:', error);
 * }
 */
export const post = async <T>(
	url: string,
	body: unknown,
	options?: IApiOptions,
): Promise<T> => {
	return request<T>(url, "POST", body, options);
}
