/**
 * Базовый URL API, получаемый из переменных окружения.
 *
 * Используется для формирования всех эндпоинтов API. Значение берётся 
 * из переменной окружения `VITE_API_BASE_URL`, заданной в файле `.env`.
 *
 * @example
 * // При значении VITE_API_BASE_URL=http://localhost:3000
 * API_BASE_URL === "http://localhost:3000"
 */
const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

/**
 * URL эндпоинта для работы с товарами (items).
 *
 * Формируется путём добавления пути `/api/items` к базовому URL API.
 * Используется в запросах получения списка товаров, деталей и т.д.
 *
 * @example
 * GET ${ITEMS_API} — получить список товаров
 */
export const ITEMS_API = `${API_BASE_URL}/api/items`;

/**
 * URL эндпоинта для работы с категориями.
 *
 * Формируется путём добавления пути `/api/categories` к базовому URL API.
 * Используется для получения иерархии или списка категорий каталога.
 *
 * @example
 * GET ${CATEGORIES_API} — получить список категорий
 */
export const CATEGORIES_API = `${API_BASE_URL}/api/categories`;
