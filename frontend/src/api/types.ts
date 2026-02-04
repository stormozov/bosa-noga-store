/** Тип, представляющий поддерживаемые HTTP-методы. */
export type HttpMethod = "GET" | "POST";

/** Интерфейс, определяющий опций для API-запросов. */
export interface IApiOptions {
	headers?: HeadersInit;
	timeout?: number;
	signal?: AbortSignal;
}

/**
 * Интерфейс конфигурации запроса, расширяющий стандартный {@link RequestInit}.
 */
export interface IFetchConfig extends RequestInit {
	timeout?: number;
}

// =============================================================================
// --- ТИПЫ И ИНТЕРФЕЙСЫ, СВЯЗАННЫЕ С КАСТОМНЫМИ ХУКАМИ РАБОТЫ С API

/** Интерфейс возвращаемого значения хука {@link useApiGet}. */
export interface IUseGetReturns<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
	refetch: () => void;
}

/** Тип функции для выполнения HTTP-запроса. */
export type ExecuteFuncType<T> = (
	url: string,
	body: unknown,
	options?: IApiOptions,
) => Promise<T>;

/** Интерфейс, описывающий возвращаемое значение хука {@link useApiPost}. */
export interface IUsePostReturns<T> {
	loading: boolean;
	error: Error | null;
	execute: ExecuteFuncType<T>;
}

/** Интерфейс состояния кастомного хука {@link usePaginatedApi}. */
export interface IPaginatedApiState<T> {
	data: T[];
	loadingInitial: boolean;
	loadingMore: boolean;
	error: Error | null;
	hasMore: boolean;
	offset: number;
}

/**
 * Интерфейс действий (actions), которые может выполнять кастомный хук
 * {@link usePaginatedApi}.
 */
export interface IPaginatedApiActions {
	refetch: (
		params?: Record<string, unknown>,
		isInitial?: boolean,
		initialOffset?: number,
	) => Promise<void>;
	loadMore: (params?: Record<string, unknown>) => Promise<void>;
	reset: () => void;
}

/** Интерфейс результата кастомного хука {@link usePaginatedApi}. */
export interface IPaginatedApiResult<T> {
	state: IPaginatedApiState<T>;
	actions: IPaginatedApiActions;
}

/** Тип, представляющий произвольные параметры запроса к API. */
export type ApiParams = Record<string, unknown>;

/** Интерфейс, описывающий параметры для пагинированного API-запроса. */
export interface IPaginatedApiParams {
	baseUrl: string;
	params?: ApiParams;
	itemsPerPage?: number;
	options?: IApiOptions;
}
